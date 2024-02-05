import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = [
  {
    locale: "en",
    name: "English",
  },
  {
    locale: "th",
    name: "Thailand",
  },
].sort((a, b) => a.locale.localeCompare(b.locale));

i18n.use(initReactI18next).init({
  supportedLngs: supportedLanguages.map((l) => l.locale),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: require("../locales/en.json") },
    th: { translation: require("../locales/th.json") },
  },
});

export default i18n;
