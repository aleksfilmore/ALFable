const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

// Best-effort in-memory rate limit. On Fluid Compute a warm instance is reused
// across requests, so this throttles bursts from a single IP. It is NOT durable
// across instances or cold starts — for hard guarantees, back this with Upstash
// Redis or enable Vercel BotID. It fails open: any error here never blocks a
// genuine enquiry.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map(); // ip -> number[] (timestamps within the window)

function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

function clientIp(request) {
  const fwd = request.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return request.headers["x-real-ip"] || "";
}

function valueOf(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requestBody(request) {
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return request.body || {};
}

async function sendEmail(payload) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

module.exports = async function contact(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  // Silently accept when over the limit so bots get no useful signal.
  if (rateLimited(clientIp(request))) {
    return response.status(200).json({ ok: true });
  }

  const body = requestBody(request);
  const name = valueOf(body.name);
  const email = valueOf(body.email);
  const message = valueOf(body.message);
  const website = valueOf(body.website);
  const locale = valueOf(body.locale) === "ro" ? "ro" : "en";

  // Silent success for bots that complete the hidden honeypot field.
  if (website) return response.status(200).json({ ok: true });

  if (
    !name ||
    !email ||
    !message ||
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !validEmail(email)
  ) {
    return response.status(400).json({ error: "Please complete the form with valid details." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return response.status(503).json({ error: "Email service is unavailable." });
  }

  const safeName = name.replace(/[\r\n]/g, " ");

  try {
    const resendResponse = await sendEmail({
      from: "ALFable <alex@alfable.com>",
      to: ["alex@alfable.com"],
      reply_to: email,
      subject: `New ALFable enquiry from ${safeName}`,
      text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (!resendResponse.ok) {
      console.error(`Resend email request failed with status ${resendResponse.status}.`);
      return response.status(502).json({ error: "Email service is unavailable." });
    }

    // Optional acknowledgement to the enquirer. Off by default: an auto-reply to
    // a caller-supplied address is an email-reflection vector, so enable it only
    // knowingly by setting SEND_ACK=true. The body carries no user-supplied text.
    if (process.env.SEND_ACK === "true") {
      const ack = locale === "ro"
        ? {
            subject: "Am primit mesajul tău — ALFable",
            text: "Îți mulțumesc pentru mesaj. L-am primit și îți răspund personal în curând.\n\n— Alexandru, ALFable",
          }
        : {
            subject: "I received your message — ALFable",
            text: "Thanks for reaching out. I've received your message and will reply personally soon.\n\n— Alexandru, ALFable",
          };
      try {
        await sendEmail({ from: "ALFable <alex@alfable.com>", to: [email], subject: ack.subject, text: ack.text });
      } catch (ackError) {
        // Acknowledgement is non-critical; never fail the enquiry because of it.
        console.error("Acknowledgement email failed.", ackError);
      }
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend email request failed.", error);
    return response.status(502).json({ error: "Email service is unavailable." });
  }
};
