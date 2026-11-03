import type { LocalizedString } from './localized'

export type EducationStatus = 'student'

/** One entry in the education history (currently a single university program). */
export interface Education {
  institution: LocalizedString
  degree: LocalizedString
  field: LocalizedString
  status: EducationStatus
  /** Verified study period, e.g. "Oct 2023 - Present". */
  period?: LocalizedString
  /** Free-form note about progress. */
  note?: LocalizedString
}

/** A training / development program (journey timeline). */
export interface TrainingEntry {
  id: string
  name: LocalizedString
  provider: LocalizedString
  status: 'ongoing' | 'completed' | 'unknown'
  /** Verified focus topics, if any. */
  topics: LocalizedString[]
  /** Verified period or phase, if any. */
  period?: LocalizedString
  /** Optional supporting note. */
  note?: LocalizedString
  /** Optional verified programme link. */
  url?: string
}
