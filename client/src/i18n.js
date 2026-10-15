// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Подключение LanguageDetector для определения языка
  .use(initReactI18next) // Подключение к React
  .init({
    resources: {
      en: { translation: require('../src/locales/en/translation.json') },
      ru: { translation: require('../src/locales/ru/translation.json') },
      kz: { translation: require('../src/locales/kz/translation.json') }
    },
    lng: localStorage.getItem('i18nextLng') || 'kz', // Загрузка языка из localStorage или по умолчанию 'kz'
    fallbackLng: 'kz', // Язык по умолчанию, если не удается определить язык пользователя
    interpolation: {
      escapeValue: false // Для React нет необходимости экранировать строки
    },
    detection: {
      order: ['localStorage', 'cookie', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'] // Сохранение выбранного языка в localStorage
    }
  });

export default i18n;
