import { useEffect, useState } from "react";

function setGoogleTranslateLanguage(lang) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) return false;

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  return true;
}

function GoogleTranslate() {
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("dashboardLanguage") || "en"
  );

  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeDashboardLanguage = (lang) => {
    setActiveLang(lang);
    localStorage.setItem("dashboardLanguage", lang);

    if (lang === "en") {
      window.location.reload();
      return;
    }

    const tryTranslate = () => {
      const success = setGoogleTranslateLanguage("hi");

      if (!success) {
        setTimeout(tryTranslate, 300);
      }
    };

    tryTranslate();
  };

  return (
    <>
      <div id="google_translate_element" className="hidden" />

      <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
        <button
          type="button"
          onClick={() => changeDashboardLanguage("en")}
          className={`px-3 py-1 text-xs font-medium transition ${
            activeLang === "en"
              ? "bg-blue-700 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => changeDashboardLanguage("hi")}
          className={`px-3 py-1 text-xs font-medium transition ${
            activeLang === "hi"
              ? "bg-blue-700 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          हिं
        </button>
      </div>
    </>
  );
}

export default GoogleTranslate;