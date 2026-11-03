import type { LocaleCode } from './localized'

export interface SiteContext {
  title: string
  supportedLocales: LocaleCode[]
  /** Verified deployed URL of the live portfolio. */
  baseUrl: string | null
}