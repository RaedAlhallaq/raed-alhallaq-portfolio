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
    <footer className="border-t border-border/70">
      <div className="container-page py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="tile flex flex-col justify-between gap-6 p-5 sm:col-span-2 lg:col-span-5">
            <div>
              <p className="text-base font-semibold tracking-tight">{localize(profile.name, language)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(
                  { en: 'Co-Founder at Hireland', ar: 'شريك مؤسس في Hireland' },
                  language,
                )}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              {language === 'ar' ? 'متاح للعمل والتعاون' : 'Available for work and collaboration'}
            </span>
          </div>

          <nav
            aria-label={language === 'en' ? 'Footer' : 'الجزء السفلي'}
            className="tile p-5 lg:col-span-3"
          >
            <p className="eyebrow text-[0.625rem]">{language === 'en' ? 'Sections' : 'الأقسام'}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-block rounded-md py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {localize(item.label, language)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="tile p-5 lg:col-span-4">
            <p className="eyebrow text-[0.625rem]">{language === 'en' ? 'Elsewhere' : 'حسابات أخرى'}</p>
            <ul className="mt-3 space-y-1.5">
              {profileSocials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 rounded-md py-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
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

        <div className="mt-8 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {localize(profile.name, language)}.{' '}
            {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              {language === 'en'
                ? 'Built with React, Vite and Tailwind CSS.'
                : 'مبني باستخدام React و Vite و Tailwind CSS.'}
            </p>
            <a
              href="#home"
              aria-label={language === 'en' ? 'Back to top' : 'العودة إلى الأعلى'}
              className="grid size-8 place-items-center rounded-full border border-border bg-background text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
