import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { contact, socials } from '@/data'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '05 · Contact', ar: '05 · تواصل' },
  title: { en: "Let's build something that works.", ar: 'لنبنِ شيئاً يعمل فعلاً.' },
  description: {
    en: 'Available for front-end work, freelance projects, and collaboration. Reach out directly — no forms, no middlemen.',
    ar: 'متاح للعمل في تطوير الواجهات والمشاريع الحرة والتعاون. تواصل معي مباشرة — دون نماذج أو وسطاء.',
  },
  email: { en: 'Email me', ar: 'راسلني' },
  whatsapp: { en: 'WhatsApp', ar: 'واتساب' },
  elsewhere: { en: 'Elsewhere', ar: 'حسابات أخرى' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
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
    <Section id="contact">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10 lg:p-12">
            <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-24 -top-24 size-64 rounded-full bg-brand/10 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <SectionIntro
                  id="contact-heading"
                  eyebrow={localize(COPY.eyebrow, language)}
                  title={localize(COPY.title, language)}
                  description={localize(COPY.description, language)}
                />

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft outline-none transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {localize(COPY.email, language)}
                  </a>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong bg-background px-5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {localize(COPY.whatsapp, language)}
                    <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-brand" aria-hidden="true" />
                  {localize(COPY.location, language)}
                  <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
                  <span dir="ltr">{contact.email}</span>
                </p>
              </div>

              <div className="lg:border-s lg:border-border/70 lg:ps-10">
                <p className="eyebrow">{localize(COPY.elsewhere, language)}</p>
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
                          aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                          className="group flex items-center gap-3 rounded-xl border border-transparent px-2.5 py-2.5 outline-none transition-colors hover:border-border hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:text-brand">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-foreground">{social.label}</span>
                            {social.handle ? (
                              <span className="block truncate text-xs text-muted-foreground">@{social.handle}</span>
                            ) : null}
                          </span>
                          <ArrowUpRight
                            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    )
                  })}
                </ul>

                <p className={cn('mt-5 text-xs leading-relaxed text-muted-foreground')}>
                  {language === 'ar'
                    ? 'أفضّل البريد الإلكتروني للتفاصيل، وواتساب للتواصل السريع.'
                    : 'Email is best for details; WhatsApp works for a quick conversation.'}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
