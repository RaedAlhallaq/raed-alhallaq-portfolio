import { ArrowUp } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { profile, socials } from '@/data'
import { navItems } from './nav-items'

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const

export function AppFooter() {
  const { language } = useLanguage()

  const year = new Date().getFullYear()
  const sections = navItems.filter((item) => item.id !== 'home')
  const profileSocials = socials.filter((social) => social.platform !== 'whatsapp')

  return (
    <footer className="border-t border-border">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-base font-semibold tracking-tight">{localize(profile.name, language)}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {localize({ en: 'Co-Founder at Hireland', ar: 'شريك مؤسس في Hireland' }, language)}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
              {language === 'ar' ? 'متاح للعمل والتعاون' : 'Available for work and collaboration'}
            </p>
          </div>

          <nav
            aria-label={language === 'en' ? 'Footer' : 'الجزء السفلي'}
            className="lg:col-span-3"
          >
            <p className="eyebrow">{language === 'en' ? 'Sections' : 'الأقسام'}</p>
            <ul className="mt-4 space-y-2">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {localize(item.label, language)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow">{language === 'en' ? 'Elsewhere' : 'حسابات أخرى'}</p>
            <ul className="mt-4 space-y-2">
              {profileSocials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {localize(profile.name, language)}.{' '}
            {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-muted-foreground">
              {language === 'en'
                ? 'Built with React, Vite and Tailwind CSS.'
                : 'مبني باستخدام React و Vite و Tailwind CSS.'}
            </p>
            <a
              href="#home"
              aria-label={language === 'en' ? 'Back to top' : 'العودة إلى الأعلى'}
              className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-foreground outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              {language === 'en' ? 'Top' : 'أعلى'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
