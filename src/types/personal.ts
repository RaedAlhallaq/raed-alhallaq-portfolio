import type { LocalizedString, Localized } from './localized'
import type { Resume } from './resume'
import type { Contact } from './contact'

export interface Profile {
  name: LocalizedString
  nameAscii: string
  /** Verified professional title: Frontend Developer. */
  title: LocalizedString
  /** Verified current headline, e.g. Co-Founder & Front-End Developer at Hireland. */
  headline: LocalizedString
  /** Short verified positioning line. */
  positioning?: LocalizedString
  /** Longer introduction, one entry per paragraph. */
  about: Localized<string[]>
  contact: Contact
  /** Null until a confirmed avatar photo is provided. */
  avatarSrc: string | null
  resume: Resume
}
