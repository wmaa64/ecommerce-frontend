import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
      translation: {
        "welcome": "Welcome to Our Store",
        "discover": "Discover the best products for you!",
        "shopNow": "Shop Now",
        "featuredProducts": "Featured Products",
        "chooseSubCategories": "Choose SubCategories, Then Press Search...",
        //Homepage
        "appName": "Electronic Shop",
        "searchButton": "Search",
        "searchBoxLabel": "Search Products",
        "newProducts": "New Products",
        "searchResuls": "Search Results",
        //HeaderWzSearch
        "login": "Login",
        "register": "Register",
      },
    },
    ar: {
      translation: {
        "welcome": "مرحبًا بكم في متجرنا",
        "discover": "اكتشف أفضل المنتجات لك!",
        "shopNow": "تسوق الآن",
        "featuredProducts": "منتجات مميزة",
        "chooseSubCategories": "اختر الفئات الفرعية، ثم اضغط على البحث...",
        //Homepage
        "appName": "المتجر الالكتروني",
        "searchButton": "بحث",
        "searchBoxLabel": "البحث عن منتجات",
        "newProducts": "منتجات جديدة",
        "searchResuls": "نتائج البحث",
        //HeaderWzSearch
        "login": "دخول",
        "register": "تسجيل",

      },
    },
};

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
  