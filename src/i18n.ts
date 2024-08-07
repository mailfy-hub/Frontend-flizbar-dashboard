import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './languages/en.json';
import translationPT from './languages/pt.json';
import translationES from './languages/es.json';

const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  },
  es: {
    translation: translationES
  }
};



const locales = ["pt", "en", "es"]
export const defaultLocale = localStorage.getItem("language") || "en";
export type Locale = (typeof locales)[number];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLocale, // Set a default language
    fallbackLng: defaultLocale,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
