import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const loadTranslations = async (lng: string, ns: string) => {
  try {
    const translations = await import(`./locales/${lng}/${ns}.json`);
    return translations.default;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Ошибка при загрузке переводов ${lng}/${ns}: ${error.message}`
      );
    }
    return {};
  }
};

const getDefaultLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userLanguage") || "ru";
  }
  return "ru";
};

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: "userLanguage",
    caches: ["localStorage"],
  },
});

const initTranslations = async () => {
  const languages = ["ru", "en", "fa"];
  const namespaces = ["nav"];

  for (const lng of languages) {
    for (const ns of namespaces) {
      const translations = await loadTranslations(lng, ns);
      i18n.addResourceBundle(lng, ns, translations);
    }
  }
};

initTranslations();

export default i18n;
