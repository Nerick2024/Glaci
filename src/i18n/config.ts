/**
 * Supported languages object.
 */
export const locales = {
  es: "ES",
  en: "EN",
  fr: "FR",
  zh: "ZH",
  de: "DE"
};

/**
 * Default language.
 */
export const defaultLang: Locale = "es";

/**
 * Translations object containing translations for different languages.
 */
export const translations = {
  es: () => import("./translations/es.json").then((module) => module.default),
  en: () => import("./translations/en.json").then((module) => module.default),
  fr: () => import("./translations/fr.json").then((module) => module.default),
  zh: () => import("./translations/zh.json").then((module) => module.default),
  de: () => import("./translations/de.json").then((module) => module.default),
} as const;

/**
 * Types
 */
export type Locale = keyof typeof locales;
export type Translation = typeof translations;
