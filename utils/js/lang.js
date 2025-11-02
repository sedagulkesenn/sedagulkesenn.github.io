async function setLanguage(lang) {
  try {
    const response = await fetch(`/utils/js/${lang}.json`);
    if (!response.ok) throw new Error("Language file not found: " + response.status);
    const translations = await response.json();

    // 1️⃣ Update normal text elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = key.split(".").reduce((o, i) => (o ? o[i] : null), translations);
      if (text != null) el.innerHTML = text;
    });

    // 2️⃣ Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = key.split(".").reduce((o, i) => (o ? o[i] : null), translations);
      if (text != null) el.setAttribute("placeholder", text);
    });

    // Save selection and update active/visual state
    localStorage.setItem("lang", lang);
    updateLanguageTexts(lang);
  } catch (error) {
    console.error("Error loading language file:", error);
  }
}

function updateLanguageTexts(activeLang) {
  document.querySelectorAll(".lang-text").forEach((el) => {
    const isActive = el.getAttribute("data-lang") === activeLang;
    el.classList.toggle("active", isActive);

  });
}

// init on every page load
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  // ensure the UI shows the active button quickly (in case setLanguage fetches)
  updateLanguageTexts(savedLang);
  // then load translations (async)
  setLanguage(savedLang);
});

// keyboard accessibility for text elements (Enter to trigger)
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-text[tabindex]").forEach((el) => {
    el.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const lang = el.getAttribute("data-lang");
        if (lang) setLanguage(lang);
      }
    });
  });
});
