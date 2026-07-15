document.getElementById("year").textContent = new Date().getFullYear();

const consentKey = "alfable-cookie-preferences";
const fontsHref = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap";
const measurementId = "G-M775PK8CJ2";
const banner = document.querySelector("[data-cookie-banner]");

function loadOptionalFonts() {
  if (document.querySelector("link[data-optional-fonts]")) return;
  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.href = fontsHref;
  fonts.dataset.optionalFonts = "true";
  document.head.appendChild(fonts);
}

function loadAnalytics() {
  window[`ga-disable-${measurementId}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { analytics_storage: "granted" });

  if (!document.querySelector("script[data-google-analytics]")) {
    const analytics = document.createElement("script");
    analytics.async = true;
    analytics.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    analytics.dataset.googleAnalytics = "true";
    document.head.appendChild(analytics);
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
  }
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
  if (value === "optional") {
    loadOptionalFonts();
    loadAnalytics();
  } else {
    disableAnalytics();
  }
}

const storedConsent = localStorage.getItem(consentKey);
if (storedConsent === "optional") {
  loadOptionalFonts();
  loadAnalytics();
}
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
