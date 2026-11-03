import type { LocalizedString } from './localized'

export interface Certification {
  id: string
  name: LocalizedString
  issuer: LocalizedString
  year: string
  /** Optional short note, only when verified. */
  note?: LocalizedString
}
