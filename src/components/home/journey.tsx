import { Award, BadgeCheck, Briefcase, GraduationCap, Sparkles } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { certifications, education, experience, trainings } from '@/data'
import type { TrainingEntry } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '02 · Experience & journey', ar: '02 · الخبرة والمسيرة' },
  title: { en: 'Work, study, and training.', ar: 'العمل والدراسة والتدريب.' },
  description: {
    en: 'A verified record of the roles, degree, and programmes that shape how I build.',
    ar: 'سجل موثّق للأدوار والدرجة العلمية والبرامج التي تصقل طريقة بنائي للمنتجات.',
  },
  experience: { en: 'Experience', ar: 'الخبرة' },
  education: { en: 'Education', ar: 'التعليم' },
  training: { en: 'Training & programmes', ar: 'التدريب والبرامج' },
  certifications: { en: 'Certificates', ar: 'الشهادات' },
  current: { en: 'Current', ar: 'حالياً' },
  leadership: { en: 'Leadership', ar: 'قيادة' },
  work: { en: 'Work', ar: 'عمل' },
  ongoing: { en: 'Ongoing', ar: 'مستمر' },
  completed: { en: 'Completed', ar: 'مكتمل' },
  inProgress: { en: 'In progress', ar: 'قيد الدراسة' },
}

function statusLabel(entry: TrainingEntry, language: 'ar' | 'en') {
  if (entry.status === 'ongoing') return localize(COPY.ongoing, language)
  if (entry.status === 'completed') return localize(COPY.completed, language)
  return null
}

export function Journey() {
  const { language } = useLanguage()

  return (
    <Section id="journey">
      <div className="container-page">
        <Reveal>
          <SectionIntro
            id="journey-heading"
            eyebrow={localize(COPY.eyebrow, language)}
            title={localize(COPY.title, language)}
            description={localize(COPY.description, language)}
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Briefcase className="size-4" aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground [dir='rtl']:tracking-normal">
                {localize(COPY.experience, language)}
              </h3>
            </div>

            <ol className="mt-7 space-y-9 border-s border-border ps-6">
              {experience.map((entry) => (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -start-[1.95rem] top-1.5 size-4 rounded-full border-2 border-background',
                      entry.current ? 'bg-brand' : 'bg-muted-foreground/50',
                    )}
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tech-label">
                      {localize(entry.type === 'leadership' ? COPY.leadership : COPY.work, language)}
                    </span>
                    {entry.current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[0.625rem] font-semibold text-foreground">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                        {localize(COPY.current, language)}
                      </span>
                    ) : null}
                    {entry.period ? <span className="tech-label">· {localize(entry.period, language)}</span> : null}
                  </div>

                  <h4 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                    {localize(entry.role, language)}
                  </h4>
                  <p className="mt-0.5 text-sm font-medium text-brand">{localize(entry.organization, language)}</p>
                  {entry.summary ? (
                    <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                      {localize(entry.summary, language)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={80}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground [dir='rtl']:tracking-normal">
                  {localize(COPY.education, language)}
                </h3>
              </div>

              <div className="card-surface mt-5 overflow-hidden">
                <div className="p-5">
                  <p className="text-base font-semibold tracking-tight">{localize(education.degree, language)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{localize(education.institution, language)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {education.period ? (
                      <span className="chip bg-background text-foreground">{localize(education.period, language)}</span>
                    ) : null}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                      {localize(COPY.inProgress, language)}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground [dir='rtl']:tracking-normal">
                  {localize(COPY.training, language)}
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {trainings.map((entry) => {
                  const status = statusLabel(entry, language)
                  return (
                    <li key={entry.id} className="rounded-xl border border-border/80 bg-card/60 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-snug">{localize(entry.name, language)}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{localize(entry.provider, language)}</p>
                        </div>
                        {status ? (
                          <span
                            className={cn(
                              'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold',
                              entry.status === 'ongoing'
                                ? 'border-brand/25 bg-brand/10 text-brand'
                                : 'border-border bg-background text-muted-foreground',
                            )}
                          >
                            {entry.status === 'completed' ? (
                              <BadgeCheck className="size-3" aria-hidden="true" />
                            ) : (
                              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                            )}
                            {status}
                          </span>
                        ) : null}
                      </div>

                      {entry.period ? <p className="tech-label mt-2">{localize(entry.period, language)}</p> : null}

                      {entry.topics.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {entry.topics.map((topic) => (
                            <li
                              key={topic.en}
                              className="rounded-md border border-border/70 bg-background px-2 py-0.5 text-[0.6875rem] text-muted-foreground"
                            >
                              {localize(topic, language)}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Award className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground [dir='rtl']:tracking-normal">
                  {localize(COPY.certifications, language)}
                </h3>
              </div>

              <ul className="mt-5 space-y-2.5">
                {certifications.map((certificate) => (
                  <li
                    key={certificate.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-card/60 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">
                        {localize(certificate.name, language)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {localize(certificate.issuer, language)}
                      </p>
                    </div>
                    <span className="tech-label shrink-0">{certificate.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
