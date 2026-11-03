import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, socials } from '@/data'
import { Section } from './section'
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
    <Section id="contact">
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] bg-foreground p-6 text-background shadow-soft sm:p-8 lg:col-span-7 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-20 -top-24 size-64 rounded-full bg-brand/25 blur-3xl"
            />

            <div className="relative">
              <p className="eyebrow flex items-center gap-2.5 text-background/60">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                {localize(COPY.eyebrow, language)}
              </p>
              <h2 id="contact-heading" className="heading-section mt-4">
                {localize(COPY.title, language)}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-background/70 sm:text-lg">
                {localize(COPY.description, language)}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-background px-5 text-sm font-semibold text-foreground shadow-soft outline-none transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-background/40"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {localize(COPY.email, language)}
                </a>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-background/25 px-5 text-sm font-semibold text-background outline-none transition-colors hover:bg-background/10 focus-visible:ring-3 focus-visible:ring-background/40"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {localize(COPY.whatsapp, language)}
                  <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-background/15 pt-5 text-sm text-background/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-brand" aria-hidden="true" />
                  {localize(COPY.location, language)}
                </span>
                <span aria-hidden="true" className="hidden h-4 w-px bg-background/20 sm:block" />
                <span dir="ltr">{contact.email}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90} className="tile flex flex-col overflow-hidden lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
              <p className="eyebrow">{localize(COPY.elsewhere, language)}</p>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            </div>

            <ul className="flex-1 divide-y divide-border/70">
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
                      className="group flex items-center gap-3.5 px-5 py-3.5 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-colors group-hover:border-brand/30 group-hover:text-brand">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">{social.label}</span>
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

            <p className="border-t border-border/70 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
              {localize(COPY.preference, language)}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
