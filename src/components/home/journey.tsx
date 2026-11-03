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

function TileHeader({
  icon: Icon,
  label,
  count,
}: {
  icon: typeof Award
  label: string
  count: number
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h3 className="flex-1 text-sm font-semibold tracking-tight text-foreground">{label}</h3>
      <span className="tech-label text-[0.625rem]">{String(count).padStart(2, '0')}</span>
    </div>
  )
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

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-12">
          <Reveal className="tile flex flex-col overflow-hidden lg:col-span-7 lg:row-span-2">
            <TileHeader
              icon={Briefcase}
              label={localize(COPY.experience, language)}
              count={experience.length}
            />

            <ol className="flex-1 px-5 py-6 sm:px-6">
              {experience.map((entry, index) => (
                <li key={entry.id} className="relative ps-7 pb-8 last:pb-0">
                  {index < experience.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-3 start-[0.4375rem] w-px bg-border"
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute start-0 top-1.5 size-3.5 rounded-full border-2 border-card ring-1',
                      entry.current
                        ? 'bg-brand ring-brand/40'
                        : 'bg-muted-foreground/45 ring-border',
                    )}
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tech-label">
                      {localize(entry.type === 'leadership' ? COPY.leadership : COPY.work, language)}
                    </span>
                    {entry.period ? (
                      <span className="tech-label">· {localize(entry.period, language)}</span>
                    ) : null}
                    {entry.current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-2 py-0.5 text-[0.625rem] font-semibold text-brand-ink">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        {localize(COPY.current, language)}
                      </span>
                    ) : null}
                  </div>

                  <h4 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                    {localize(entry.role, language)}
                  </h4>
                  <p className="mt-0.5 text-sm font-medium text-brand">
                    {localize(entry.organization, language)}
                  </p>
                  {entry.summary ? (
                    <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                      {localize(entry.summary, language)}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={80} className="tile flex flex-col overflow-hidden lg:col-span-5">
            <TileHeader icon={GraduationCap} label={localize(COPY.education, language)} count={1} />

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-base font-semibold tracking-tight">
                {localize(education.degree, language)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(education.institution, language)}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {education.period ? (
                  <span className="chip bg-background text-foreground">
                    {localize(education.period, language)}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                  {localize(COPY.inProgress, language)}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="tile flex flex-col overflow-hidden lg:col-span-5">
            <TileHeader
              icon={Award}
              label={localize(COPY.certifications, language)}
              count={certifications.length}
            />

            <ul className="divide-y divide-border/70">
              {certifications.map((certificate) => (
                <li
                  key={certificate.id}
                  className="flex items-start justify-between gap-3 px-5 py-3 sm:px-6"
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

          <Reveal delay={200} className="tile flex flex-col overflow-hidden lg:col-span-12">
            <TileHeader
              icon={Sparkles}
              label={localize(COPY.training, language)}
              count={trainings.length}
            />

            <ul className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
              {trainings.map((entry) => {
                const status = statusLabel(entry, language)
                return (
                  <li
                    key={entry.id}
                    className="flex flex-col rounded-xl border border-border/70 bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug">
                          {localize(entry.name, language)}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {localize(entry.provider, language)}
                        </p>
                      </div>
                      {status ? (
                        <span
                          className={cn(
                            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold',
                            entry.status === 'ongoing'
                              ? 'border-brand/25 bg-brand-soft text-brand-ink'
                              : 'border-border bg-muted text-muted-foreground',
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

                    {entry.period ? (
                      <p className="tech-label mt-2">{localize(entry.period, language)}</p>
                    ) : null}

                    {entry.topics.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {entry.topics.map((topic) => (
                          <li
                            key={topic.en}
                            className="rounded-md border border-border/70 bg-muted/50 px-2 py-0.5 text-[0.6875rem] text-muted-foreground"
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
        </div>
      </div>
    </Section>
  )
}
