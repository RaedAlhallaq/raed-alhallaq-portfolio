import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { certifications, education, experience, trainings } from '@/data'
import type { TrainingEntry } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '02 — Experience & journey', ar: '02 — الخبرة والمسيرة' },
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

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h3 className="eyebrow">{localize(COPY.experience, language)}</h3>
            <ol className="mt-5">
              {experience.map((entry) => (
                <li
                  key={entry.id}
                  className="grid gap-2 border-t border-border py-6 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="text-xs leading-relaxed text-muted-foreground">
                    <p>{entry.period ? localize(entry.period, language) : '—'}</p>
                    {entry.current ? (
                      <p className="mt-1 inline-flex items-center gap-1.5 text-foreground">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
                        {localize(COPY.current, language)}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {localize(entry.role, language)}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-foreground">
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

          <Reveal delay={80} className="lg:col-span-5">
            <div>
              <h3 className="eyebrow">{localize(COPY.education, language)}</h3>
              <div className="mt-5 border-t border-border pt-5">
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
            </div>

            <div className="mt-10">
              <h3 className="eyebrow">{localize(COPY.certifications, language)}</h3>
              <ul className="mt-5">
                {certifications.map((certificate) => (
                  <li
                    key={certificate.id}
                    className="flex items-baseline justify-between gap-4 border-t border-border py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug">
                        {localize(certificate.name, language)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {localize(certificate.issuer, language)}
                      </p>
                    </div>
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {certificate.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-12">
            <h3 className="eyebrow">{localize(COPY.training, language)}</h3>
            <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((entry) => {
                const status = statusLabel(entry, language)
                return (
                  <li key={entry.id} className="border-t border-border pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold leading-snug">
                        {localize(entry.name, language)}
                      </p>
                      {status ? (
                        <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
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
