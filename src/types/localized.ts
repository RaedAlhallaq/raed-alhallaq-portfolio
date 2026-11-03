export type LocaleCode = 'ar' | 'en'

export interface LocalizedString {
  en: string
  ar: string
}

export type Localized<T = string> = Record<LocaleCode, T>