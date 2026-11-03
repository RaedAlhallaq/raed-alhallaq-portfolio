import type { Localized, LocalizedString } from './localized'

export type ExperienceType = 'work' | 'leadership' | 'program'

export interface ExperienceEntry {
  id: string
  role: LocalizedString
  organization: LocalizedString
  type: ExperienceType
  /** True only for a current role or programme. */
  current?: boolean
  /** Verified period label, if available. */
  period?: LocalizedString
  location?: LocalizedString
  /** Short, factual description. Never invents responsibilities. */
  summary?: LocalizedString
  /** Concrete verified points shown under the role. */
  highlights?: Localized<string[]>
  /** Optional verified link. */
  url?: string
}
