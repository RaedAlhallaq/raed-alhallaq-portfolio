import { Link } from 'react-router-dom'
import { ArrowDown, Mail, MapPin } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, profile, projects, socials } from '@/data'

const COPY = {
  brand: { en: 'Portfolio © 2026', ar: 'بورتفوليو © 2026' },
  availability: { en: 'Available for front-end work', ar: 'متاح للعمل في تطوير الواجهات' },
  note: { en: "let's build something that works", ar: 'لنبنِ شيئاً يعمل فعلاً' },
  lead: {
    en: 'I build clean, responsive web interfaces with React, TypeScript, and a strong eye for detail.',
    ar: 'أبني واجهات ويب نظيفة ومتجاوبة باستخدام React و TypeScript، مع اهتمام قوي بالتفاصيل.',
  },
  viewWork: { en: 'View work', ar: 'شاهد الأعمال' },
  contact: { en: 'Get in touch', ar: 'تواصل معي' },
  role: {
    en: 'Front-End Developer (React & TypeScript)',
    ar: 'مطوّر واجهات أمامية (React وTypeScript)',
  },
  stats: [
    { value: `${projects.length}`, suffix: '+', label: { en: 'Projects & builds', ar: 'مشروعاً وأعمالاً' } },
    { value: 'B.Sc.', suffix: '', label: { en: 'Computer science', ar: 'علوم الحاسوب' } },
    { value: 'AR / EN', suffix: '', label: { en: 'Bilingual delivery', ar: 'تسليم ثنائي اللغة' } },
  ],
  scroll: { en: 'Scroll', ar: 'مرّر' },
  profileAlt: { en: 'Portrait of Raed Alhallaq', ar: 'صورة رائد الحلاق' },
}

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const

export function Hero() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const degree = education.degree
  const giantWord = isArabic ? 'رائد' : 'RAED'

  return (
    <section id="home" className="relative scroll-mt-[66px] overflow-hidden border-b border-border">
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-col lg:h-[calc(100svh-66px)] lg:min-h-[680px]">
        {/* Hero top info row */}
        <div className="gutter-x relative z-10 flex items-start justify-between gap-4 pt-4 text-[11px]">
          <p className="font-bold uppercase tracking-[0.06em] text-accent">
            {localize(COPY.brand, language)}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {localize(COPY.availability, language)}
          </p>
        </div>

        {/* Oversized background word */}
        <div
          aria-hidden="true"
          className="display-hero gutter-x pointer-events-none relative z-0 mt-2 select-none lg:absolute lg:inset-x-0 lg:top-14"
        >
          {giantWord}
        </div>

        {/* Portrait */}
        <div className="relative z-[1] mt-3 self-center lg:absolute lg:bottom-0 lg:end-auto lg:h-[86%] lg:mt-0 lg:self-auto lg:start-[31%] lg:w-[38%]">
          <div className="relative mx-auto h-[min(56svh,25rem)] w-[82%] max-w-[560px] max-lg:overflow-hidden lg:m-0 lg:h-full lg:w-full">
            {profile.avatarSrc ? (
              <img
                src={profile.avatarSrc}
                alt={localize(COPY.profileAlt, language)}
                width={640}
                height={800}
                className="size-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
                loading="eager"
                fetchPriority="high"
              />
            ) : (
              <div className="display grid size-full place-items-center text-8xl text-accent/70">
                {isArabic ? 'ر' : 'RA'}
              </div>
            )}
          </div>
        </div>

        {/* Intro block */}
        <div className="gutter-x relative z-[2] mt-7 pb-2 lg:absolute lg:bottom-24 lg:w-[30%] lg:min-w-[290px] lg:pb-0">
          <p className="handwriting -rotate-6">{localize(COPY.note, language)}</p>
          <h1 className="display-title mt-2">{localize(profile.name, language)}</h1>
          <p className="mt-3 text-[0.9375rem] font-extrabold leading-snug text-accent sm:text-sm lg:text-[1.05rem]">
            {localize(COPY.role, language)}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[0.8125rem] lg:text-sm">
            {localize(COPY.lead, language)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/#projects"
              className="inline-flex min-h-12 items-center gap-6 bg-brand px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {localize(COPY.viewWork, language)}
              <span aria-hidden="true" className="text-accent-foreground/90">
                →
              </span>
            </Link>
            <Link
              to="/#contact"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {localize(COPY.contact, language)}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            {isArabic ? 'غزة، فلسطين' : 'Gaza, Palestine'}
          </p>
        </div>

        {/* Verified stats */}
        <div className="gutter-x mt-10 grid grid-cols-3 gap-3 border-t border-border py-2 sm:gap-6 lg:absolute lg:bottom-24 lg:z-[2] lg:my-0 lg:w-[17%] lg:min-w-[200px] lg:grid-cols-1 lg:border-0 lg:py-0">
          {COPY.stats.map((stat) => (
            <div
              key={stat.label.en}
              className="flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-4 lg:border-b lg:border-border lg:py-3"
            >
              <p className="num-display min-w-0 text-3xl sm:text-4xl lg:w-16 lg:shrink-0 lg:text-5xl">
                {stat.value}
                {stat.suffix ? <span className="text-[0.6em]">{stat.suffix}</span> : null}
              </p>
              <p className="text-[10px] leading-snug text-muted-foreground lg:text-[11px]">
                {localize(stat.label, language)}
              </p>
            </div>
          ))}
          <div className="col-span-3 flex items-end gap-2 lg:hidden">
            {socials
              .filter((social) => social.platform !== 'whatsapp')
              .map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                    className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground outline-none transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                )
              })}
          </div>
        </div>

        {/* Hero bottom bar */}
        <div className="gutter-x relative z-[3] mt-2 flex min-h-14 flex-col gap-2 border-t border-border bg-background py-3 text-[11px] lg:mt-0 lg:h-16 lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-row lg:items-center lg:justify-between lg:bg-gradient-to-t lg:from-background lg:pb-1 lg:pt-0">
          <p className="flex items-center gap-4 text-muted-foreground lg:order-1">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5 text-accent" aria-hidden="true" />
              {isArabic ? 'غزة، فلسطين' : 'Gaza, Palestine'}
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-accent sm:inline-flex"
            >
              <Mail className="size-3.5 text-accent" aria-hidden="true" />
              {contact.email}
            </a>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground lg:order-3">
            {localize(COPY.scroll, language)}
            <ArrowDown className="size-3.5 text-accent" aria-hidden="true" />
          </p>
          <div className="hidden items-center gap-1 lg:order-2 lg:flex">
            {socials
              .filter((social) => social.platform !== 'whatsapp')
              .map((social) => {
                const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={social.handle ? `${social.label}: ${social.handle}` : social.label}
                    className="inline-flex size-11 items-center justify-center text-muted-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                )
              })}
          </div>
        </div>
      </div>

      {/* Keep education context available for AT without visible extra markup */}
      <p className="sr-only">{localize(degree, language)}</p>
    </section>
  )
}
