import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, profile, socials } from '@/data'

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const

const COPY = {
  role: { en: 'Front-End Developer (React & TypeScript)', ar: 'مطوّر واجهات أمامية (React وTypeScript)' },
  available: { en: 'Available for front-end work', ar: 'متاح للعمل في تطوير الواجهات' },
  built: { en: 'Built with React, Vite and Tailwind CSS.', ar: 'مبني باستخدام React وVite وTailwind CSS.' },
  top: { en: 'Back to top', ar: 'العودة إلى الأعلى' },
  rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
}

export function AppFooter() {
  const { language } = useLanguage()

  const year = new Date().getFullYear()
  const profileSocials = socials.filter((social) => social.platform !== 'whatsapp')

  return (
    <footer className="border-t border-line">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <a
              href="#home"
              className="font-display text-lg font-extrabold uppercase tracking-[0.14em] transition-colors hover:text-accent"
            >
              {localize(profile.name, language)}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {localize(COPY.role, language)}
            </p>
            <p className="mt-4 inline-flex items-center gap-2.5">
              <span className="status-dot" aria-hidden="true" />
              <span className="label-mono">{localize(COPY.available, language)}</span>
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:justify-end">
            {profileSocials.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
              if (!Icon) return null
              return (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                    className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span>{social.label}</span>
                  </a>
                </li>
              )
            })}
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span>{language === 'en' ? 'Email' : 'البريد'}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {localize(profile.name, language)}. {localize(COPY.rights, language)}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>{localize(COPY.built, language)}</p>
            <a
              href="#home"
              className="inline-flex min-h-11 items-center gap-1.5 text-foreground transition-colors hover:text-accent"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              {localize(COPY.top, language)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
