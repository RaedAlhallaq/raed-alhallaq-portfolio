import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { LocaleCode } from '@/types/localized'

export type Language = LocaleCode
export type Direction = 'ltr' | 'rtl'

export const LANGUAGE_STORAGE_KEY = 'raed_portfolio_lang'

const DEFAULT_LANGUAGE: Language = 'en'

const LOCALE_DIRECTION: Record<Language, Direction> = {
  en: 'ltr',
  ar: 'rtl',
}

const OG_LOCALE: Record<Language, string> = {
  en: 'en_US',
  ar: 'ar_AR',
}

interface LanguageContextValue {
  language: Language
  dir: Direction
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return stored === 'ar' ? 'ar' : stored === 'en' ? 'en' : DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  const dir: Direction = LOCALE_DIRECTION[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute('content', OG_LOCALE[language])
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language, dir])

  const setLanguage = useCallback((next: Language) => setLanguageState(next), [])
  const toggleLanguage = useCallback(
    () => setLanguageState((current) => (current === 'en' ? 'ar' : 'en')),
    [],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ language, dir, setLanguage, toggleLanguage }),
    [language, dir, setLanguage, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}