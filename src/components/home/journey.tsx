import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { certifications, education, experience, trainings } from '@/data'
import type { ExperienceType, TrainingEntry } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '04 — Journey', ar: '04 — المسيرة' },
  title: { en: 'Work, study, and training.', ar: 'العمل والدراسة والتدريب.' },
  description: {
    en: 'A verified record of the roles, degree, and programmes that shape how I build.',
    ar: 'سجل موثّق للأدوار والدرجة العلمية والبرامج التي تصقل طريقة بنائي للمنتجات.',
  },
  meta: { en: 'Roles, study & training', ar: 'أدوار ودراسة وتدريب' },
  experience: { en: 'Experience', ar: 'الخبرة' },
  education: { en: 'Education', ar: 'التعليم' },
  training: { en: 'Training & programmes', ar: 'التدريب والبرامج' },
  certifications: { en: 'Certificates', ar: 'الشهادات' },
  current: { en: 'Current', ar: 'حالياً' },
  inProgress: { en: 'In progress', ar: 'قيد الدراسة' },
  ongoing: { en: 'Ongoing', ar: 'مستمر' },
  completed: { en: 'Completed', ar: 'مكتمل' },
}

const TYPE_LABEL: Record<ExperienceType, { en: string; ar: string }> = {
  work: { en: 'Work', ar: 'عمل' },
  leadership: { en: 'Leadership', ar: 'قيادة' },
  program: { en: 'Programme', ar: 'برنامج' },
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
            meta={localize(COPY.meta, language)}
          />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="label-mono">{localize(COPY.experience, language)}</h3>
          </Reveal>

          <div className="mt-4 border-t border-line">
            {experience.map((entry, index) => (
              <Reveal
                key={entry.id}
                delay={Math.min(index, 4) * 50}
                className="grid gap-3 border-b border-line py-7 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-2">
                  <p className="label-mono">{entry.period ? localize(entry.period, language) : '—'}</p>
                  {entry.current ? (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-foreground">
                      <span aria-hidden="true" className="size-1 bg-accent" />
                      {localize(COPY.current, language)}
                    </p>
                  ) : null}
                </div>

                <div className="lg:col-span-7">
                  <h4 className="display-md">{localize(entry.role, language)}</h4>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {localize(entry.organization, language)}
                  </p>
                  {entry.summary ? (
                    <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
                      {localize(entry.summary, language)}
                    </p>
                  ) : null}
                </div>

                <div className="lg:col-span-3 lg:text-end">
                  <p className="label-mono">{localize(TYPE_LABEL[entry.type], language)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h3 className="label-mono">{localize(COPY.education, language)}</h3>
            <div className="mt-4 border-t border-line pt-4">
              <p className="display-sm">{localize(education.degree, language)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(education.institution, language)}
              </p>
              <p className="label-mono mt-4">
                {education.period ? `${localize(education.period, language)} · ` : ''}
                {localize(COPY.inProgress, language)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-4">
            <h3 className="label-mono">{localize(COPY.certifications, language)}</h3>
            <ul className="mt-4 border-t border-line">
              {certifications.map((certificate) => (
                <li
                  key={certificate.id}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      {localize(certificate.name, language)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {localize(certificate.issuer, language)}
                    </p>
                  </div>
                  <span className="label-mono shrink-0">{certificate.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <h3 className="label-mono">{localize(COPY.training, language)}</h3>
            <ul className="mt-4 border-t border-line">
              {trainings.map((entry) => {
                const status = statusLabel(entry, language)
                return (
                  <li key={entry.id} className="border-b border-line py-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium leading-snug">
                        {localize(entry.name, language)}
                      </p>
                      {status ? <span className="label-mono shrink-0">{status}</span> : null}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {localize(entry.provider, language)}
                    </p>
                    {entry.period ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {localize(entry.period, language)}
                      </p>
                    ) : null}
                    {entry.topics.length > 0 ? (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
