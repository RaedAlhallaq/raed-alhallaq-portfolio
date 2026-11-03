import type { LocalizedString } from './localized'

export type SkillCategory = 'frontend' | 'backend' | 'languages' | 'tools'

/** Visual weight only; never a score. */
export type SkillLevel = 'core' | 'working' | 'familiar'

export interface Skill {
  id: string
  name: LocalizedString
  category: SkillCategory
  level?: SkillLevel
  secondary?: boolean
}
