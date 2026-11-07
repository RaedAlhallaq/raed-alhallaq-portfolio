import type { LocalizedString } from '@/types/localized'

export interface NavItem {
  id: string
  href: string
  label: LocalizedString
}

/**
 * Primary navigation. Work leads, because the projects are the portfolio.
 * The contact item is rendered as a dedicated call-to-action in the header.
 */
export const navItems: NavItem[] = [
  { id: 'projects', href: '/#projects', label: { en: 'Work', ar: 'الأعمال' } },
  { id: 'about', href: '/#about', label: { en: 'About', ar: 'نبذة' } },
  { id: 'skills', href: '/#skills', label: { en: 'Skills', ar: 'المهارات' } },
  { id: 'journey', href: '/#journey', label: { en: 'Journey', ar: 'المسيرة' } },
  { id: 'contact', href: '/#contact', label: { en: 'Contact', ar: 'تواصل' } },
]

export const siteSectionIds = navItems.map((item) => item.id)

export const headerNavItems = navItems.filter((item) => item.id !== 'contact')
