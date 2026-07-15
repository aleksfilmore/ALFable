document.getElementById("year").textContent = new Date().getFullYear();

/* Fonts are self-hosted (see @font-face in styles.css), so they load for every
   visitor with no third-party request and no consent gate. Only analytics is
   consent-gated below. */

const consentKey = "alfable-cookie-preferences";
const measurementId = "G-M775PK8CJ2";
const banner = document.querySelector("[data-cookie-banner]");

function loadAnalytics() {
  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "update", { analytics_storage: "granted" });
}

function disableAnalytics() {
  window[`ga-disable-${measurementId}`] = true;
  if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga")) document.cookie = `${name}=; ${expiry}`;
  });
}

function setConsent(value) {
  localStorage.setItem(consentKey, value);
  banner?.classList.remove("is-visible");
  banner?.setAttribute("aria-hidden", "true");
  if (value === "optional") loadAnalytics();
  else disableAnalytics();
}

const storedConsent = localStorage.getItem(consentKey);
if (storedConsent === "optional") loadAnalytics();
if (!storedConsent) {
  banner?.classList.add("is-visible");
  banner?.setAttribute("aria-hidden", "false");
}

document.querySelector("[data-cookie-essential]")?.addEventListener("click", () => setConsent("essential"));
document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setConsent("optional"));
document.querySelector("[data-cookie-settings]")?.addEventListener("click", () => {
  banner?.classList.add("is-visible");
  banner?.setAttribute("aria-hidden", "false");
});

/* Contact form: progressive enhancement over the native POST.
   Set the action to your Formspree endpoint (https://formspree.io/f/XXXX) to
   go live; until then it falls back to the email address shown in the form. */
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = contactForm?.querySelector("[data-form-status]");

function setStatus(message) {
  if (formStatus) formStatus.textContent = message;
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = contactForm.getAttribute("action") || "";
  if (action.includes("YOUR_FORM_ID")) {
    setStatus("Contact form isn’t connected yet. Email alex@alfable.com and I’ll reply personally.");
    return;
  }
  const submitButton = contactForm.querySelector("button[type=submit]");
  if (submitButton) submitButton.disabled = true;
  setStatus("Sending…");
  try {
    const response = await fetch(action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      contactForm.reset();
      setStatus("Thanks. Your message is on its way, and I’ll be in touch soon.");
    } else {
      setStatus("Something went wrong. Please email alex@alfable.com instead.");
    }
  } catch {
    setStatus("Network error. Please email alex@alfable.com instead.");
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
