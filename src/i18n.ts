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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set a default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;