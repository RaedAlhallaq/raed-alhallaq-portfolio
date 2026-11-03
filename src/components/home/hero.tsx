import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
import { buttonVariants } from '@/components/ui/button'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { contact, profile, projects, socials } from '@/data'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  availability: { en: 'Available for front-end work', ar: 'متاح للعمل في تطوير الواجهات' },
  lead: {
    en: 'I build clean, responsive web interfaces with React, TypeScript, and a strong eye for detail.',
    ar: 'أبني واجهات ويب نظيفة ومتجاوبة باستخدام React و TypeScript، مع اهتمام قوي بالتفاصيل.',
  },
  viewProjects: { en: 'View projects', ar: 'شاهد المشاريع' },
  contact: { en: 'Get in touch', ar: 'تواصل معي' },
  stats: [
    { value: String(projects.length), label: { en: 'Selected projects', ar: 'مشروعاً مختاراً' } },
    { value: 'B.Sc.', label: { en: 'Computer science', ar: 'علوم الحاسوب' } },
    { value: 'AR / EN', label: { en: 'Bilingual work', ar: 'عمل ثنائي اللغة' } },
  ],
  cardRole: { en: 'Frontend Developer', ar: 'مطوّر واجهات أمامية' },
  hireland: { en: 'Co-Founder @ Hireland', ar: 'شريك مؤسس في Hireland' },
  education: { en: 'Islamic University of Gaza', ar: 'الجامعة الإسلامية بغزة' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
  profileAlt: { en: 'Portrait of Raed Alhallaq', ar: 'صورة رائد الحلاق' },
  current: { en: 'Current', ar: 'حالياً' },
}

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const

export function Hero() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-x-0 top-0 h-[40rem]"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--brand) 13%, transparent), transparent 72%)',
          }}
        />
        <div className="dot-grid absolute inset-x-0 top-0 h-[32rem] opacity-50" />
      </div>

      <div className="container-page grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:pb-24 lg:pt-24">
        <Reveal className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-foreground shadow-soft backdrop-blur">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              {localize(COPY.availability, language)}
            </span>
            <span className="tech-label inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {localize(COPY.location, language)}
            </span>
          </div>

          <h1 className="display-title mt-6">{localize(profile.name, language)}</h1>

          <p className="mt-4 text-sm font-medium text-brand sm:text-base">
            {localize(profile.headline, language)}
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {localize(COPY.lead, language)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/#projects"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-11 gap-2 rounded-xl px-5 text-sm shadow-soft',
              )}
            >
              {localize(COPY.viewProjects, language)}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link
              to="/#contact"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-11 gap-2 rounded-xl border-border-strong px-5 text-sm',
              )}
            >
              {localize(COPY.contact, language)}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-1">
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
                    className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Icon className="size-4.5" aria-hidden="true" />
                  </a>
                )
              })}
            <span aria-hidden="true" className="mx-2 h-4 w-px bg-border" />
            <span className="text-xs text-muted-foreground">
              {isArabic ? 'مفتوح للتعاون والفرص' : 'Open to collaboration and opportunities'}
            </span>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-border border-t border-border pt-6 rtl:divide-x-reverse">
            {COPY.stats.map((stat) => (
              <div key={stat.label.en} className="px-4 first:ps-0 last:pe-0">
                <dt className="tech-label text-[0.625rem]">{localize(stat.label, language)}</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-none lg:justify-self-end">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand/10 blur-3xl"
            />

            <div className="card-surface relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative overflow-hidden rounded-[1.4rem] bg-muted">
                {profile.avatarSrc ? (
                  <img
                    src={profile.avatarSrc}
                    alt={localize(COPY.profileAlt, language)}
                    width={460}
                    height={460}
                    className="aspect-square w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                ) : (
                  <div className="grid aspect-square place-items-center text-6xl font-semibold text-muted-foreground">
                    {isArabic ? 'ر' : 'RA'}
                  </div>
                )}

                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-background/85 px-3.5 py-2.5 shadow-soft backdrop-blur-md">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-tight">
                      {localize(profile.name, language)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {localize(COPY.cardRole, language)}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[0.625rem] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                    {localize(COPY.current, language)}
                  </span>
                </div>
              </div>

              <div className="grid gap-1 p-3 pt-4">
                <div className="flex items-center gap-3 rounded-xl px-2.5 py-2">
                  <Briefcase className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{localize(COPY.hireland, language)}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {localize(profile.headline, language)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl px-2.5 py-2">
                  <GraduationCap className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{localize(COPY.education, language)}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {localize({ en: 'B.Sc. Computer Science · in progress', ar: 'بكالوريوس علوم الحاسوب · قيد الدراسة' }, language)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl px-2.5 py-2">
                  <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{localize(COPY.location, language)}</p>
                    <p className="truncate text-xs text-muted-foreground" dir="ltr">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
