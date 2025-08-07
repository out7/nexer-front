import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import "dayjs/locale/fa";

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

if (typeof window !== "undefined") {
  localStorage.setItem("userLanguage", "ru");
}

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
    format: (value, format, lng) => {
      if (value instanceof Date) {
        return dayjs(value)
          .locale(lng || "ru")
          .format(format);
      }
      return value;
    },
  },
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: "userLanguage",
    caches: ["localStorage"],
  },
  resources: {},
});

const initTranslations = async () => {
  const languages = ["ru", "en", "fa"];
  const namespaces = ["nav"];

  try {
    const promises = languages.flatMap((lng) =>
      namespaces.map(async (ns) => {
        const translations = await loadTranslations(lng, ns);
        i18n.addResourceBundle(lng, ns, translations, true, true);
        return { lng, ns, translations };
      })
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
};

// Инициализируем переводы
initTranslations().then(() => {
  i18n.changeLanguage("ru");
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userLanguage", lng);
  }
});

export default i18n;
