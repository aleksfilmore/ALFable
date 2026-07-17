document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");

function setNavigation(open) {
  navToggle?.setAttribute("aria-expanded", String(open));
  primaryNav?.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
}

navToggle?.addEventListener("click", () => {
  setNavigation(navToggle.getAttribute("aria-expanded") !== "true");
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavigation(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavigation(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) setNavigation(false);
});

/* Fonts are self-hosted (see @font-face in styles.css), so they load for every
   visitor with no third-party request and no consent gate. Only analytics is
   consent-gated below. */

const consentKey = "alfable-cookie-preferences";
const measurementId = "G-M775PK8CJ2";
const banner = document.querySelector("[data-cookie-banner]");
let analyticsLoading = false;

function loadAnalytics() {
  if (!document.querySelector("[data-google-analytics]") && !analyticsLoading) {
    analyticsLoading = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.googleAnalytics = "";
    document.head.append(script);
  }
  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

function disableAnalytics() {
  window[`ga-disable-${measurementId}`] = true;
  if (window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  // GA sets _ga cookies on the registrable domain, so expire both the
  // host-only and domain-scoped variants or the deletion never matches.
  const domain = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; ${expiry}`;
      document.cookie = `${name}=; domain=.${domain}; ${expiry}`;
    }
  });
}

function setConsent(value) {
  localStorage.setItem(consentKey, value);
  banner?.classList.remove("is-visible");
  banner?.setAttribute("aria-hidden", "true");
  if (banner) banner.inert = true;
  if (value === "optional") loadAnalytics();
  else disableAnalytics();
}

const storedConsent = localStorage.getItem(consentKey);
if (storedConsent === "optional") loadAnalytics();
if (!storedConsent) {
  banner?.classList.add("is-visible");
  banner?.setAttribute("aria-hidden", "false");
  if (banner) banner.inert = false;
}

document.querySelector("[data-cookie-essential]")?.addEventListener("click", () => setConsent("essential"));
document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setConsent("optional"));
document.querySelector("[data-cookie-settings]")?.addEventListener("click", () => {
  banner?.classList.add("is-visible");
  banner?.setAttribute("aria-hidden", "false");
  if (banner) banner.inert = false;
});

/* Contact form: progressive enhancement over the native POST to /api/contact. */
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = contactForm?.querySelector("[data-form-status]");
const isRomanian = document.documentElement.lang.startsWith("ro");
const formCopy = isRomanian
  ? {
      sending: "Se trimite…",
      success: "Mulțumesc. Mesajul tău a fost trimis și revin în curând.",
      error: "Ceva nu a funcționat. Trimite-mi un email la alex@alfable.com.",
      network: "Eroare de rețea. Trimite-mi un email la alex@alfable.com.",
    }
  : {
      sending: "Sending…",
      success: "Thanks. Your message is on its way, and I’ll be in touch soon.",
      error: "Something went wrong. Please email alex@alfable.com instead.",
      network: "Network error. Please email alex@alfable.com instead.",
    };

function setStatus(message) {
  if (formStatus) formStatus.textContent = message;
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = contactForm.getAttribute("action") || "";
  const submitButton = contactForm.querySelector("button[type=submit]");
  if (submitButton) submitButton.disabled = true;
  setStatus(formCopy.sending);
  try {
    const response = await fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(contactForm).entries()), locale: isRomanian ? "ro" : "en" }),
    });
    if (response.ok) {
      contactForm.reset();
      setStatus(formCopy.success);
    } else {
      setStatus(formCopy.error);
    }
  } catch {
    setStatus(formCopy.network);
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
