import type { LocalizedString, LocaleCode } from '@/types/localized'

/**
 * Resolve a localized string for the active locale.
 */
export function localize(value: LocalizedString, language: LocaleCode): string {
  return value[language]
}