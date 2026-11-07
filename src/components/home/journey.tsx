import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { certifications, education, experience, trainings } from '@/data'
import type { TrainingEntry } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '03 — Experience & journey', ar: '03 — الخبرة والمسيرة' },
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
  inProgress: { en: 'In progress', ar: 'قيد الدراسة' },
  ongoing: { en: 'Ongoing', ar: 'مستمر' },
  completed: { en: 'Completed', ar: 'مكتمل' },
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

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Experience rows: red index, period column, role + org. */}
          <Reveal className="lg:col-span-7">
            <h3 className="eyebrow">{localize(COPY.experience, language)}</h3>
            <ol className="mt-5">
              {experience.map((entry, index) => (
                <li
                  key={entry.id}
                  className="grid gap-3 border-t border-border py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground sm:flex-col sm:gap-1.5">
                    <span className="num-display min-w-10 text-xl sm:text-2xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p>{entry.period ? localize(entry.period, language) : '—'}</p>
                      {entry.current ? (
                        <p className="mt-1 inline-flex items-center gap-1.5 text-foreground">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                          {localize(COPY.current, language)}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {localize(entry.role, language)}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {localize(entry.organization, language)}
                    </p>
                    {entry.summary ? (
                      <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-muted-foreground">
                        {localize(entry.summary, language)}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Education + certificates panels in one accent-framed column. */}
          <Reveal delay={80} className="lg:col-span-5">
            <div className="border border-border">
              <div className="border-b border-border px-5 py-3">
                <h3 className="eyebrow">{localize(COPY.education, language)}</h3>
              </div>
              <div className="px-5 py-5">
                <p className="text-base font-semibold tracking-tight">
                  {localize(education.degree, language)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {localize(education.institution, language)}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {education.period ? `${localize(education.period, language)} · ` : ''}
                  {localize(COPY.inProgress, language)}
                </p>
              </div>

              <div className="border-t border-border px-5 py-3">
                <h3 className="eyebrow">{localize(COPY.certifications, language)}</h3>
              </div>
              <ul className="px-5 pb-3">
                {certifications.map((certificate) => (
                  <li
                    key={certificate.id}
                    className="flex items-baseline justify-between gap-4 border-b border-border/70 py-3.5 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">
                        {localize(certificate.name, language)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {localize(certificate.issuer, language)}
                      </p>
                    </div>
                    <span className="font-mono text-[0.625rem] text-accent">
                      {certificate.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Training programmes in a full-width bordered cell grid. */}
          <Reveal delay={140} className="lg:col-span-12">
            <h3 className="eyebrow">{localize(COPY.training, language)}</h3>
            <ul className="mt-5 grid border-s border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((entry) => {
                const status = statusLabel(entry, language)
                return (
                  <li key={entry.id} className="border-b border-e border-border p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold leading-snug">
                        {localize(entry.name, language)}
                      </p>
                      {status ? (
                        <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-accent">
                          {status}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {localize(entry.provider, language)}
                    </p>
                    {entry.period ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {localize(entry.period, language)}
                      </p>
                    ) : null}
                    {entry.topics.length > 0 ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {entry.topics.map((topic) => localize(topic, language)).join(' · ')}
                      </p>
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
