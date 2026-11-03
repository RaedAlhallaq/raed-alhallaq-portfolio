import {
  Accessibility,
  ArrowLeftRight,
  Briefcase,
  Code2,
  GraduationCap,
  Languages,
  MapPin,
} from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { contact, education, profile } from '@/data'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '01 · About', ar: '01 · نبذة' },
  title: {
    en: 'A front-end developer with an engineer’s habits.',
    ar: 'مطوّر واجهات أمامية بعقلية مهندس.',
  },
  description: {
    en: 'Clean interfaces, readable code, and details that hold up after launch.',
    ar: 'واجهات نظيفة، وكود مقروء، وتفاصيل تصمد بعد الإطلاق.',
  },
  glance: { en: 'At a glance', ar: 'نظرة سريعة' },
  focus: { en: 'Focus', ar: 'مجالات التركيز' },
  rows: [
    {
      id: 'role',
      icon: Briefcase,
      label: { en: 'Current role', ar: 'الدور الحالي' },
      value: { en: 'Co-Founder at Hireland', ar: 'شريك مؤسس في Hireland' },
    },
    {
      id: 'education',
      icon: GraduationCap,
      label: { en: 'Education', ar: 'التعليم' },
      value: {
        en: `${localize(education.degree, 'en')} — ${localize(education.institution, 'en')}`,
        ar: `${localize(education.degree, 'ar')} — ${localize(education.institution, 'ar')}`,
      },
    },
    {
      id: 'location',
      icon: MapPin,
      label: { en: 'Location', ar: 'الموقع' },
      value: { en: contact.location ?? '', ar: 'غزة، فلسطين' },
    },
    {
      id: 'languages',
      icon: Languages,
      label: { en: 'Languages', ar: 'اللغات' },
      value: { en: 'Arabic · English', ar: 'العربية · الإنجليزية' },
    },
  ],
  focusItems: [
    { en: 'React', ar: 'React' },
    { en: 'TypeScript', ar: 'TypeScript' },
    { en: 'Tailwind CSS', ar: 'Tailwind CSS' },
    { en: 'RTL interfaces', ar: 'واجهات RTL' },
    { en: 'Accessibility', ar: 'إمكانية الوصول' },
  ],
  principles: [
    {
      icon: Code2,
      title: { en: 'Clean code', ar: 'كود نظيف' },
      text: {
        en: 'Readable structure and predictable components that are easy to extend.',
        ar: 'بنية مقروءة ومكوّنات متوقّعة يسهل توسيعها.',
      },
    },
    {
      icon: Accessibility,
      title: { en: 'Accessible by default', ar: 'إمكانية وصول افتراضية' },
      text: {
        en: 'Keyboard-friendly, semantic, and usable with a screen reader.',
        ar: 'متوافق مع لوحة المفاتيح ودلالي وقابل للاستخدام مع قارئ الشاشة.',
      },
    },
    {
      icon: ArrowLeftRight,
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

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-12">
          <Reveal className="tile flex flex-col p-6 sm:p-8 lg:col-span-7">
            <p className="tech-label">01 / 04</p>
            <div className="mt-5 max-w-[62ch] space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.about[language].map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? 'text-foreground' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="tile flex flex-col overflow-hidden lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
              <p className="eyebrow">{localize(COPY.glance, language)}</p>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            </div>

            <ul className="divide-y divide-border/70">
              {COPY.rows.map((row) => {
                const Icon = row.icon
                return (
                  <li key={row.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 px-5 py-3.5">
                    <span className="row-span-2 mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="eyebrow text-[0.625rem]">{localize(row.label, language)}</span>
                    <p className="mt-1 min-w-0 text-sm font-medium leading-relaxed text-foreground">
                      {localize(row.value, language)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto border-t border-border/70 px-5 py-4">
              <p className="eyebrow text-[0.625rem]">{localize(COPY.focus, language)}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {COPY.focusItems.map((item) => (
                  <li key={item.en} className="chip bg-background">
                    {localize(item, language)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {COPY.principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <Reveal
                key={principle.title.en}
                delay={120 + index * 60}
                className="tile flex flex-col gap-4 p-5 sm:p-6 lg:col-span-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-tile">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <span className="tech-label text-[0.625rem]">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight">
                    {localize(principle.title, language)}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {localize(principle.text, language)}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
