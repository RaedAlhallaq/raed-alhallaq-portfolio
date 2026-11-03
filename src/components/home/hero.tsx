import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, profile, projects, socials } from '@/data'

const COPY = {
  availability: { en: 'Available for front-end work', ar: 'متاح للعمل في تطوير الواجهات' },
  lead: {
    en: 'I build clean, responsive web interfaces with React, TypeScript, and a strong eye for detail.',
    ar: 'أبني واجهات ويب نظيفة ومتجاوبة باستخدام React و TypeScript، مع اهتمام قوي بالتفاصيل.',
  },
  viewProjects: { en: 'View projects', ar: 'شاهد المشاريع' },
  contact: { en: 'Get in touch', ar: 'تواصل معي' },
  stats: [
    { value: String(projects.length), label: { en: 'Projects & builds', ar: 'مشروعاً وأعمالاً' } },
    { value: 'B.Sc.', label: { en: 'Computer science', ar: 'علوم الحاسوب' } },
    { value: 'AR / EN', label: { en: 'Bilingual work', ar: 'عمل ثنائي اللغة' } },
  ],
  cardRole: { en: 'Front-End Developer (React & TypeScript)', ar: 'مطوّر واجهات أمامية (React وTypeScript)' },
  khibraRole: { en: 'Co-Founder — Khibra Center for Training & Development', ar: 'شريك مؤسس — مركز خبرة للتدريب والتطوير' },
  hirelandRole: { en: 'Co-Founder at Hireland · Front-End Developer', ar: 'شريك مؤسس في Hireland · مطوّر واجهات أمامية' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
  profileAlt: { en: 'Portrait of Raed Alhallaq', ar: 'صورة رائد الحلاق' },
  since: { en: 'Portfolio — 2026', ar: 'بورتفوليو — 2026' },
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

  return (
    <section id="home" className="relative scroll-mt-24 overflow-x-clip pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pt-20">
      <div aria-hidden="true" className="aurora-hero pointer-events-none absolute inset-x-0 -top-16 h-[36rem]" />
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-gilt" />
                {localize(COPY.availability, language)}
              </p>
              <span aria-hidden="true" className="hidden h-3 w-px bg-border-strong sm:block" />
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden="true" />
                {localize(COPY.location, language)}
              </p>
            </div>

            <h1 className="display-title mt-7">
              {localize(profile.name, language)}
            </h1>

            <p className="mt-7 max-w-2xl text-sm font-medium leading-relaxed text-foreground sm:text-base">
              {localize(profile.headline, language)}
            </p>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {localize(COPY.lead, language)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/#projects"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background shadow-[0_10px_36px_-12px_color-mix(in_oklch,var(--gilt)_55%,transparent)] outline-none transition-all hover:-translate-y-0.5 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {localize(COPY.viewProjects, language)}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link to="/#contact" className="link text-sm">
                {localize(COPY.contact, language)}
              </Link>
            </div>

            <div className="mt-12 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2 lg:mt-auto lg:pt-8">
              <div>
                <p className="eyebrow">{language === 'en' ? 'Current' : 'حالياً'}</p>
                <p className="mt-2 font-medium">{localize(COPY.khibraRole, language)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{localize(COPY.hirelandRole, language)}</p>
              </div>
              <div>
                <p className="eyebrow">{language === 'en' ? 'Education' : 'التعليم'}</p>
                <p className="mt-2 font-medium">{localize(degree, language)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {localize(education.institution, language)}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-3 -bottom-3 rounded-[1.25rem] bg-[radial-gradient(60%_60%_at_50%_100%,color-mix(in_oklch,var(--gilt)_16%,transparent),transparent_70%)] opacity-70 blur-md transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted sm:aspect-[5/4] lg:aspect-[4/5]">
                {profile.avatarSrc ? (
                  <img
                    src={profile.avatarSrc}
                    alt={localize(COPY.profileAlt, language)}
                    width={640}
                    height={800}
                    className="absolute inset-0 size-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center font-serif text-6xl text-muted-foreground">
                    {isArabic ? 'ر' : 'RA'}
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-[color-mix(in_oklch,var(--foreground)_14%,transparent)]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{localize(COPY.cardRole, language)}</p>
                <p className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground rtl:tracking-normal">
                  {localize(COPY.since, language)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
          {COPY.stats.map((stat) => (
            <div key={stat.label.en}>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{localize(stat.label, language)}</p>
            </div>
          ))}
          <div className="flex items-end justify-between gap-3 sm:justify-start sm:gap-4">
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
                    className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground outline-none transition-colors hover:border-gilt/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                )
              })}
            <a
              href={`mailto:${contact.email}`}
              className="hidden text-xs text-muted-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-gilt sm:inline"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
