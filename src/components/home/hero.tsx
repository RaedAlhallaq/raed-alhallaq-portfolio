import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Marquee } from '@/components/shared/marquee'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, experience, profile, projects, skills } from '@/data'

const COPY = {
  availability: { en: 'Available for front-end work', ar: 'متاح للعمل في تطوير الواجهات' },
  discipline: {
    en: 'Front-End Developer / React & TypeScript',
    ar: 'مطوّر واجهات أمامية / React وTypeScript',
  },
  viewWork: { en: 'View selected work', ar: 'شاهد أعمالاً مختارة' },
  contact: { en: 'Get in touch', ar: 'تواصل معي' },
  current: { en: 'Current', ar: 'حالياً' },
  education: { en: 'Education', ar: 'التعليم' },
  focus: { en: 'Focus', ar: 'التركيز' },
  location: { en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
  year: { en: 'Portfolio — 2026', ar: 'بورتفوليو — 2026' },
  portraitAlt: { en: 'Portrait of Raed Alhallaq', ar: 'صورة رائد الحلاق' },
  projectsCount: { en: 'projects & builds', ar: 'مشروعاً وأعمالاً' },
  portraitLabel: { en: 'Portrait', ar: 'صورة' },
}

const FOCUS_IDS = ['react', 'typescript', 'tailwind', 'rtl']

export function Hero() {
  const { language } = useLanguage()

  const nameParts = localize(profile.name, language).split(' ')
  const firstName = nameParts[0] ?? localize(profile.name, language)
  const lastName = nameParts.slice(1).join(' ')

  const currentRoles = experience.filter((entry) => entry.current)
  const focus = FOCUS_IDS.map((id) => skills.find((skill) => skill.id === id)).filter(
    (skill): skill is NonNullable<typeof skill> => Boolean(skill),
  )

  return (
    <section id="home" className="relative overflow-x-clip pt-[6.75rem] sm:pt-[8rem] lg:pt-[9rem]">
      <div className="container-page">
        <div
          className="hero-fade flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-4"
          style={{ animationDelay: '40ms' }}
        >
          <p className="label-mono inline-flex items-center gap-2.5">
            <span className="status-dot" aria-hidden="true" />
            {localize(COPY.availability, language)}
          </p>
          <p className="label-mono max-w-full break-words">
            {localize(COPY.location, language)} · {localize(COPY.year, language)}
          </p>
        </div>

        <div className="mt-8">
          <p
            className="label-mono hero-fade text-accent"
            style={{ animationDelay: '100ms' }}
          >
            {localize(COPY.discipline, language)}
          </p>

          <div className="hero-name">
            <h1 className="display-hero mt-4 sm:mt-6">
              <span className="hero-line">
                <span style={{ animationDelay: '140ms' }}>{firstName}</span>
              </span>
              {lastName ? (
                <span className="hero-line">
                  <span className="display-outline" style={{ animationDelay: '240ms' }}>
                    {lastName}
                  </span>
                </span>
              ) : null}
            </h1>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <figure
            className="hero-fade order-2 lg:order-1 lg:col-span-3"
            style={{ animationDelay: '320ms' }}
          >
            <div className="relative aspect-square w-full max-w-[16.5rem] overflow-hidden border border-line bg-surface sm:max-w-[19rem] lg:max-w-none">
              {profile.avatarSrc ? (
                <img
                  src={profile.avatarSrc}
                  alt={localize(COPY.portraitAlt, language)}
                  width={460}
                  height={460}
                  className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.03]"
                  loading="eager"
                  fetchPriority="high"
                />
              ) : null}
              <span aria-hidden="true" className="absolute end-3 top-3 size-2 bg-accent" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="label-mono">{localize(profile.name, language)}</span>
              <span className="label-mono text-accent">/ {localize(COPY.portraitLabel, language)}</span>
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <p className="text-lead max-w-md text-foreground">{profile.about[language][0]}</p>

            <p className="label-mono mt-5 max-w-md leading-relaxed normal-case tracking-normal">
              {localize(profile.headline, language)}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/#projects" className="btn btn-primary">
                {localize(COPY.viewWork, language)}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                <span className="text-accent-foreground/60">
                  {String(projects.length).padStart(2, '0')}
                </span>
              </Link>
              <Link to="/#contact" className="btn btn-outline">
                {localize(COPY.contact, language)}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="order-3 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <div className="border-t border-line pt-4">
              <p className="label-mono">{localize(COPY.current, language)}</p>
              <ul className="mt-3 space-y-2.5">
                {currentRoles.map((entry) => (
                  <li key={entry.id}>
                    <p className="display-sm">{localize(entry.role, language)}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {localize(entry.organization, language)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="border-t border-line pt-4">
                <p className="label-mono">{localize(COPY.education, language)}</p>
                <p className="display-sm mt-3">{localize(education.degree, language)}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {localize(education.institution, language)}
                </p>
              </div>

              <div className="border-t border-line pt-4">
                <p className="label-mono">{localize(COPY.focus, language)}</p>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                  {focus.map((skill) => (
                    <li key={skill.id} className="text-sm text-foreground">
                      {localize(skill.name, language)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 sm:col-span-2 lg:col-span-1">
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden="true" />
                {localize(COPY.location, language)}
              </p>
              <p className="label-mono">
                <span className="text-foreground">{String(projects.length).padStart(2, '0')}</span>{' '}
                {localize(COPY.projectsCount, language)}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="link-underline text-xs text-muted-foreground hover:text-foreground"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        className="mt-14 lg:mt-20"
        items={skills.map((skill) => localize(skill.name, language))}
      />
    </section>
  )
}
