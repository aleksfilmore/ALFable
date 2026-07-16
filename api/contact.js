const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

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

module.exports = async function contact(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const body = requestBody(request);
  const name = valueOf(body.name);
  const email = valueOf(body.email);
  const message = valueOf(body.message);
  const website = valueOf(body.website);

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

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ALFable <alex@alfable.com>",
        to: ["alex@alfable.com"],
        reply_to: email,
        subject: `New ALFable enquiry from ${name.replace(/[\r\n]/g, " ")}`,
        text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error(`Resend email request failed with status ${resendResponse.status}.`);
      return response.status(502).json({ error: "Email service is unavailable." });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend email request failed.", error);
    return response.status(502).json({ error: "Email service is unavailable." });
  }
};
