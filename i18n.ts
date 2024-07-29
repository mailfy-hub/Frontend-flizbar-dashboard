import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDictionary } from '../lib/dictionary';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: getDictionary('en'),
      },
      pt: {
        translation: getDictionary('pt'),
      },
      es: {
        translation: getDictionary('es'),
      },
    },
    lng: 'en', // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;