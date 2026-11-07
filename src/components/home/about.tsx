import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, profile } from '@/data'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '02 — About', ar: '02 — نبذة' },
  title: {
    en: 'A front-end developer with an engineer’s habits.',
    ar: 'مطوّر واجهات أمامية بعقلية مهندس.',
  },
  description: {
    en: 'Clean interfaces, readable code, and details that hold up after launch.',
    ar: 'واجهات نظيفة، وكود مقروء، وتفاصيل تصمد بعد الإطلاق.',
  },
  meta: { en: 'Gaza · Arabic / English', ar: 'غزة · العربية / الإنجليزية' },
  glance: { en: 'At a glance', ar: 'نظرة سريعة' },
  rows: [
    {
      id: 'role',
      label: { en: 'Current role', ar: 'الدور الحالي' },
      value: {
        en: 'Co-Founder — Khibra Center for Training & Development · Hireland',
        ar: 'شريك مؤسس — مركز خبرة للتدريب والتطوير · Hireland',
      },
    },
    {
      id: 'education',
      label: { en: 'Education', ar: 'التعليم' },
      value: {
        en: `${localize(education.degree, 'en')}, ${localize(education.institution, 'en')}`,
        ar: `${localize(education.degree, 'ar')}، ${localize(education.institution, 'ar')}`,
      },
    },
    {
      id: 'location',
      label: { en: 'Location', ar: 'الموقع' },
      value: { en: contact.location ?? '', ar: 'غزة، فلسطين' },
    },
    {
      id: 'languages',
      label: { en: 'Languages', ar: 'اللغات' },
      value: { en: 'Arabic · English', ar: 'العربية · الإنجليزية' },
    },
  ],
  principles: [
    {
      title: { en: 'Clean code', ar: 'كود نظيف' },
      text: {
        en: 'Readable structure and predictable components that are easy to extend.',
        ar: 'بنية مقروءة ومكوّنات متوقّعة يسهل توسيعها.',
      },
    },
    {
      title: { en: 'Accessible by default', ar: 'إمكانية وصول افتراضية' },
      text: {
        en: 'Keyboard-friendly, semantic, and usable with a screen reader.',
        ar: 'متوافق مع لوحة المفاتيح ودلالي وقابل للاستخدام مع قارئ الشاشة.',
      },
    },
    {
      title: { en: 'RTL as a first-class case', ar: 'RTL كحالة أساسية' },
      text: {
        en: 'Arabic and English are designed together, not patched afterwards.',
        ar: 'تُصمَّم العربية والإنجليزية معاً، لا تُعالَج لاحقاً.',
      },
    },
  ],
}

export function About() {
  const { language } = useLanguage()

  return (
    <Section id="about">
      <div className="container-page">
        <Reveal>
          <SectionIntro
            id="about-heading"
            eyebrow={localize(COPY.eyebrow, language)}
            title={localize(COPY.title, language)}
            description={localize(COPY.description, language)}
            meta={localize(COPY.meta, language)}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="space-y-5">
              {profile.about[language].map((paragraph, index) =>
                index === 0 ? (
                  <p
                    key={paragraph}
                    className="editorial-dropcap text-lead max-w-[58ch] text-foreground"
                  >
                    {paragraph}
                  </p>
                ) : (
                  <p
                    key={paragraph}
                    className="max-w-[62ch] text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <aside className="border border-line bg-surface">
              <div className="p-6 sm:p-8">
                <p className="label-mono">{localize(COPY.glance, language)}</p>
                <dl className="mt-6">
                  {COPY.rows.map((row) => (
                    <div
                      key={row.id}
                      className="grid gap-1 border-t border-line py-3.5 first:border-t-0 first:pt-0"
                    >
                      <dt className="label-mono">{localize(row.label, language)}</dt>
                      <dd className="text-sm font-medium leading-relaxed text-foreground">
                        {localize(row.value, language)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="border-t border-line p-6 sm:p-8">
                <p className="display-sm max-w-[26ch]">
                  {localize(profile.positioning ?? profile.headline, language)}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line">
          {COPY.principles.map((principle, index) => (
            <Reveal
              key={principle.title.en}
              delay={120 + index * 50}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 border-b border-line py-6 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-8"
            >
              <p className="label-mono text-accent">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="display-sm">{localize(principle.title, language)}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1 sm:text-base">
                {localize(principle.text, language)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
