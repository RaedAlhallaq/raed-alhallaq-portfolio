import type { LocalizedString } from './localized'

/** State of the official CV / resume. */
export type ResumeStatus = 'not-provided'

export interface Resume {
  status: ResumeStatus
  /** Explanation shown to the visitor (localized). */
  note: LocalizedString
}