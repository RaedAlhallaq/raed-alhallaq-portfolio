import { ArrowUpRight, MapPin } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, socials } from '@/data'
import { Section } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '05 — Contact', ar: '05 — تواصل' },
  title: { en: "Let's build something that works.", ar: 'لنبنِ شيئاً يعمل فعلاً.' },
  description: {
    en: 'Available for front-end work, freelance projects, and collaboration. Reach out directly — no forms, no middlemen.',
    ar: 'متاح للعمل في تطوير الواجهات والمشاريع الحرة والتعاون. تواصل معي مباشرة — دون نماذج أو وسطاء.',
  },
  whatsapp: { en: 'Message on WhatsApp', ar: 'راسلني على واتساب' },
  elsewhere: { en: 'Elsewhere', ar: 'حسابات أخرى' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
  preference: {
    en: 'Email is best for details; WhatsApp works for a quick conversation.',
    ar: 'أفضّل البريد الإلكتروني للتفاصيل، وواتساب للتواصل السريع.',
  },
}

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const

export function Contact() {
  const { language } = useLanguage()
  const profileSocials = socials.filter((social) => social.platform !== 'whatsapp')

  return (
    <Section id="contact" className="relative overflow-x-clip">
      <div aria-hidden="true" className="aurora-end pointer-events-none absolute inset-x-0 bottom-0 h-[26rem]" />
      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{localize(COPY.eyebrow, language)}</p>
            <h2 id="contact-heading" className="heading-section mt-4 max-w-xl">
              {localize(COPY.title, language)}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {localize(COPY.description, language)}
            </p>

            <div className="mt-9">
              <a
                href={`mailto:${contact.email}`}
                className="inline-block break-words text-xl font-medium tracking-tight text-foreground underline decoration-border-strong decoration-1 underline-offset-[6px] outline-none transition-colors hover:decoration-gilt focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-3xl"
              >
                {contact.email}
              </a>
              <div className="mt-5">
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="link inline-flex items-center gap-1.5 text-sm"
                >
                  {localize(COPY.whatsapp, language)}
                  <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <p className="eyebrow">{localize(COPY.elsewhere, language)}</p>
            <ul className="mt-5">
              {profileSocials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <li key={social.platform} className="border-t border-border last:border-b">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                      className="group flex items-center justify-between gap-4 py-3.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40"
                    >
                      <span className="flex min-w-0 items-baseline gap-3">
                        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="text-sm font-medium">{social.label}</span>
                        {social.handle ? (
                          <span className="truncate text-xs text-muted-foreground">@{social.handle}</span>
                        ) : null}
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gilt rtl:-scale-x-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {localize(COPY.location, language)}
            </p>
            <p className="max-w-md">{localize(COPY.preference, language)}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
