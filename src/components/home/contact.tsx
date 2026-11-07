import { Mail, MapPin, MessageCircle } from 'lucide-react'
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
  emailCta: { en: 'Email me', ar: 'راسلني عبر البريد' },
  whatsapp: { en: 'WhatsApp', ar: 'واتساب' },
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
      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow">{localize(COPY.eyebrow, language)}</p>
          <h2 id="contact-heading" className="display-title mt-2 max-w-4xl">
            {localize(COPY.title, language)}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            {localize(COPY.description, language)}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Direct channels */}
          <Reveal className="lg:col-span-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${contact.email}`}
                className="group flex min-h-24 flex-col justify-between border border-border p-5 outline-none transition-colors hover:border-accent focus-visible:border-accent"
              >
                <span className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-5 text-xs text-muted-foreground">{localize(COPY.emailCta, language)}</span>
                <span className="break-all text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  {contact.email}
                </span>
              </a>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex min-h-24 flex-col justify-between border border-border p-5 outline-none transition-colors hover:border-accent focus-visible:border-accent"
              >
                <span className="inline-flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                  <MessageCircle className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-5 text-xs text-muted-foreground">{localize(COPY.whatsapp, language)}</span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  {contact.phone}
                </span>
              </a>
            </div>

            <p className="mt-5 flex max-w-md items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              {localize(COPY.location, language)} · {localize(COPY.preference, language)}
            </p>
          </Reveal>

          {/* Elsewhere list */}
          <Reveal delay={80} className="lg:col-span-6">
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
                      className="group flex min-h-14 items-center justify-between gap-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/40"
                    >
                      <span className="flex min-w-0 items-baseline gap-3">
                        <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
                        <span className="text-sm font-medium transition-colors group-hover:text-accent">{social.label}</span>
                        {social.handle ? (
                          <span className="truncate text-xs text-muted-foreground">@{social.handle}</span>
                        ) : null}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-colors group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
