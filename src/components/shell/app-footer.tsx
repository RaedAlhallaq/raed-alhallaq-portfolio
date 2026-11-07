import { Link } from 'react-router-dom'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, socials } from '@/data'
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
    <footer className="border-t border-border bg-[color-mix(in_oklch,var(--card)_100%,transparent)]">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 sm:py-5">
        <Link
          to="/#home"
          className="group inline-flex items-baseline gap-0.5 outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <span className="display text-lg uppercase">Raed</span>
          <span aria-hidden="true" className="text-[0.6rem] text-accent">
            .
          </span>
        </Link>

        <nav aria-label={language === 'en' ? 'Footer' : 'روابط أسفل الصفحة'} className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {sections.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-[0.6875rem] text-muted-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {localize(item.label, language)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {profileSocials.map((social) => {
            const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
            if (!Icon) return null
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={social.label}
                className="inline-flex size-11 items-center justify-center text-muted-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            )
          })}
        </div>

        <p className="w-full text-[0.625rem] leading-relaxed text-muted-foreground sm:w-auto">
          © {year}{' '}
          {localize(
            {
              en: 'Raed Alhallaq · Co-Founder — Khibra Center for Training & Development · Hireland',
              ar: 'رائد الحلاق · شريك مؤسس — مركز خبرة للتدريب والتطوير · Hireland',
            },
            language,
          )}
          {contact.location ? ` · ${contact.location}` : ''}
        </p>
      </div>
    </footer>
  )
}
