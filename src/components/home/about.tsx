import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, profile } from '@/data'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '01 — About', ar: '01 — نبذة' },
  title: {
    en: 'A front-end developer with an engineer’s habits.',
    ar: 'مطوّر واجهات أمامية بعقلية مهندس.',
  },
  description: {
    en: 'Clean interfaces, readable code, and details that hold up after launch.',
    ar: 'واجهات نظيفة، وكود مقروء، وتفاصيل تصمد بعد الإطلاق.',
  },
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
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Lead: first paragraph oversized like an opening title card. */}
          <Reveal className="lg:col-span-7">
            <div className="max-w-[62ch] space-y-6">
              {profile.about[language].map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? 'text-xl font-medium leading-relaxed text-foreground sm:text-2xl'
                      : 'text-[0.9375rem] leading-relaxed text-muted-foreground'
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* At-a-glance fact panel with an accent frame. */}
          <Reveal delay={80} className="lg:col-span-5">
            <div className="border border-border">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="eyebrow">{localize(COPY.glance, language)}</p>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              </div>
              <dl className="px-5 pb-2">
                {COPY.rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-border/70 py-3.5 last:border-0"
                  >
                    <dt className="text-xs leading-relaxed text-muted-foreground">
                      {localize(row.label, language)}
                    </dt>
                    <dd className="text-[0.8125rem] font-medium leading-relaxed text-foreground">
                      {localize(row.value, language)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Principles: numbered editorial cells with red indices. */}
        <div className="mt-16 grid sm:grid-cols-3">
          {COPY.principles.map((principle, index) => (
            <Reveal
              key={principle.title.en}
              delay={120 + index * 60}
              className="border-t border-border px-0 py-8 sm:px-8 sm:py-10 sm:last:pe-0"
            >
              <p className="num-display text-2xl sm:text-3xl">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {localize(principle.title, language)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {localize(principle.text, language)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
