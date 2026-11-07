import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, socials } from '@/data'
import { Section } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '05 — Contact', ar: '05 — تواصل' },
  question: { en: 'Have a project', ar: 'لديك مشروع' },
  questionEnd: { en: 'in mind?', ar: 'في بالك؟' },
  build: { en: "Let's talk", ar: 'لنتحدث' },
  something: { en: 'about it.', ar: 'عنه.' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
  start: { en: 'Start a conversation', ar: 'ابدأ الحديث' },
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
  whatsapp: MessageCircle,
} as const

export function Contact() {
  const { language } = useLanguage()

  return (
    <Section id="contact" className="overflow-x-clip pb-16 sm:pb-20">
      <div className="container-page">
        <div className="border-t border-line pt-4">
          <p className="label-mono inline-flex items-center gap-3">
            <span aria-hidden="true" className="size-1 bg-accent" />
            {localize(COPY.eyebrow, language)}
          </p>
        </div>

        <Reveal>
          <h2 id="contact-heading" className="display-xl mt-8">
            {localize(COPY.question, language)}
            <br />
            {localize(COPY.questionEnd, language)}
          </h2>
          <p className="display-xl mt-3 text-muted-foreground">
            {localize(COPY.build, language)} <br className="hidden sm:block" />
            <span className="text-accent">{localize(COPY.something, language)}</span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <p className="label-mono">{localize(COPY.email, language)}</p>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-3 block w-fit max-w-full"
            >
              <span className="block break-words font-display text-[clamp(1.25rem,3.5vw,3.5rem)] font-bold leading-tight tracking-[-0.04em] transition-colors group-hover:text-accent">
                {contact.email}
                <ArrowUpRight
                  className="ms-2 inline-block size-[0.62em] align-baseline rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn btn-primary">
                {localize(COPY.start, language)}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn-outline"
              >
                {localize(COPY.whatsapp, language)}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {localize(COPY.preference, language)}
            </p>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-4">
            <p className="label-mono">{localize(COPY.elsewhere, language)}</p>
            <ul className="mt-4 border-t border-line">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <li key={social.platform} className="border-b border-line">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                      className="group flex min-h-14 items-center justify-between gap-4 py-2"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="text-sm font-medium transition-colors group-hover:text-accent">
                          {social.label}
                        </span>
                        {social.handle ? (
                          <span className="hidden truncate text-xs text-muted-foreground sm:inline">
                            @{social.handle}
                          </span>
                        ) : null}
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              {localize(COPY.location, language)}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
