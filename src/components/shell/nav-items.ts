import type { LocalizedString } from '@/types/localized'

export interface NavItem {
  id: string
  href: string
  label: LocalizedString
}

export const navItems: NavItem[] = [
  { id: 'home', href: '/#home', label: { en: 'Home', ar: 'الرئيسية' } },
  { id: 'about', href: '/#about', label: { en: 'About', ar: 'نبذة' } },
  { id: 'skills', href: '/#skills', label: { en: 'Skills', ar: 'المهارات' } },
  { id: 'journey', href: '/#journey', label: { en: 'Journey', ar: 'المسيرة' } },
  { id: 'projects', href: '/#projects', label: { en: 'Projects', ar: 'المشاريع' } },
  { id: 'contact', href: '/#contact', label: { en: 'Contact', ar: 'تواصل' } },
]

export const siteSectionIds = navItems.map((item) => item.id)
