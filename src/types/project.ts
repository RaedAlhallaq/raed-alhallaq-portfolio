import type { LocalizedString } from './localized'

export type ProjectCategory = 'full-stack' | 'frontend' | 'backend'

export type ProjectLinkType = 'live-demo' | 'repository'

export interface ProjectLink {
  type: ProjectLinkType
  url: string
  /** Optional link label; falls back to a localized default elsewhere. */
  label?: LocalizedString
}

export interface ProjectImage {
  src: string
  alt: LocalizedString
}

export type ProjectDateStatus = 'to-be-confirmed' | 'unavailable'

export interface ProjectDate {
  status: ProjectDateStatus
  /** Only present when a verified date becomes available. */
  display?: LocalizedString
}

export interface IndividualOwnership {
  kind: 'individual'
}

export interface TeamOwnership {
  kind: 'team'
  /** Company / team name when relevant. */
  teamName?: LocalizedString
  /** Verified leadership/role label, e.g. "Team Lead". */
  role?: LocalizedString
  /** True only when leadership is verified. */
  isLead?: boolean
  /** Free-form notes about participation (never invents responsibilities). */
  note?: LocalizedString
}

export type ProjectOwnership = IndividualOwnership | TeamOwnership

export interface Project {
  slug: string
  title: LocalizedString
  /** Absent when the project category is not verified. */
  category?: ProjectCategory
  /**
   * Short verified summary — displayed in cards.
   * Kept factual per the approved spec; no invented claims.
   */
  summary: LocalizedString
  /** Optional longer details; only filled once verified. */
  details?: LocalizedString
  ownership: ProjectOwnership
  /** Empty until real screenshots are provided. */
  images: ProjectImage[]
  /** Only verified links. Absent = none. */
  links: ProjectLink[]
  date: ProjectDate
  /** Verified technology stack. */
  stack?: string[]
  /** Featured work appears in the main selected-work section. */
  featured?: boolean
  /**
   * Template and practice work listed under "Other projects" instead of the
   * main gallery. Still reachable through its own detail page.
   */
  secondary?: boolean
  /** Short honest note, e.g. "Academic team project". */
  note?: LocalizedString
}
