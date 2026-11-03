import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/brand-icons'
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
    { value: String(projects.length), label: { en: 'Projects & builds', ar: 'مشروعاً وأعمالاً' } },
    { value: 'B.Sc.', label: { en: 'Computer science', ar: 'علوم الحاسوب' } },
    { value: 'AR / EN', label: { en: 'Bilingual work', ar: 'عمل ثنائي اللغة' } },
  ],
  cardRole: { en: 'Front-End Developer (React & TypeScript)', ar: 'مطوّر واجهات أمامية (React وTypeScript)' },
  hireland: { en: 'Co-Founder @ Hireland', ar: 'شريك مؤسس في Hireland' },
  education: { en: 'Islamic University of Gaza', ar: 'الجامعة الإسلامية بغزة' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
  profileAlt: { en: 'Portrait of Raed Alhallaq', ar: 'صورة رائد الحلاق' },
  current: { en: 'Current', ar: 'حالياً' },
  collaboration: { en: 'Open to collaboration and opportunities', ar: 'مفتوح للتعاون والفرص' },
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
    <section id="home" className="relative scroll-mt-24 overflow-hidden pb-6 pt-5 sm:pt-8 lg:pt-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 65% at 50% 0%, color-mix(in oklch, var(--brand) 11%, transparent), transparent 70%)',
          }}
        />
      </div>

      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <Reveal className="tile flex-1 overflow-hidden p-6 sm:p-8 lg:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                  {localize(COPY.availability, language)}
                </span>
                <span className="tech-label inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {localize(COPY.location, language)}
                </span>
              </div>

              <h1 className="display-title mt-6">{localize(profile.name, language)}</h1>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-brand sm:text-[0.9375rem]">
                {localize(profile.headline, language)}
              </p>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {localize(COPY.lead, language)}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/#projects"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background shadow-soft outline-none transition-[transform,opacity] hover:opacity-90 active:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {localize(COPY.viewProjects, language)}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong bg-background px-5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {localize(COPY.contact, language)}
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border/70 pt-5">
                <div className="flex items-center gap-1">
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
                          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          <Icon className="size-4.5" aria-hidden="true" />
                        </a>
                      )
                    })}
                </div>
                <span className="text-xs text-muted-foreground">
                  {localize(COPY.collaboration, language)}
                </span>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {COPY.stats.map((stat, index) => (
                <Reveal
                  key={stat.label.en}
                  delay={index * 60}
                  className={cn(
                    'flex flex-col justify-between gap-6 p-5',
                    index === 0 ? 'tile-soft' : 'tile',
                  )}
                >
                  <p
                    className={cn(
                      'tech-label text-[0.625rem]',
                      index === 0 && 'text-accent-foreground/70',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <p
                      className={cn(
                        'text-2xl font-semibold tracking-tight sm:text-3xl',
                        index === 0 && 'text-accent-foreground',
                      )}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={cn(
                        'mt-1 text-xs',
                        index === 0 ? 'text-accent-foreground/80' : 'text-muted-foreground',
                      )}
                    >
                      {localize(stat.label, language)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120} className="tile flex flex-col overflow-hidden p-2.5 sm:flex-row lg:col-span-5 lg:flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-muted sm:aspect-[4/3] sm:w-[50%] lg:aspect-auto lg:w-full lg:min-h-[24rem] lg:flex-1">
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
                <div className="absolute inset-0 grid place-items-center text-6xl font-semibold text-muted-foreground">
                  {isArabic ? 'ر' : 'RA'}
                </div>
              )}

              <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[0.625rem] font-semibold text-foreground shadow-soft backdrop-blur-md">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                  {localize(COPY.current, language)}
                </span>
                <span className="rounded-full bg-background/85 px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-md">
                  {isArabic ? 'غزة' : 'GZA'}
                </span>
              </div>

              <div className="absolute inset-x-2.5 bottom-2.5 rounded-xl border border-border/60 bg-background/85 px-3.5 py-2.5 backdrop-blur-md">
                <p className="truncate text-sm font-semibold tracking-tight">
                  {localize(profile.name, language)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {localize(COPY.cardRole, language)}
                </p>
              </div>
            </div>

            <div className="grid gap-0.5 p-2 pt-3 sm:flex-1 sm:content-start sm:pt-2 lg:pt-3">
              <div className="flex items-center gap-3 rounded-xl px-2.5 py-2">
                <Briefcase className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{localize(COPY.hireland, language)}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {localize({ en: 'Present', ar: 'حتى الآن' }, language)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl px-2.5 py-2">
                <GraduationCap className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{localize(COPY.education, language)}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {localize(
                      { en: 'B.Sc. Computer Science · in progress', ar: 'بكالوريوس علوم الحاسوب · قيد الدراسة' },
                      language,
                    )}
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
