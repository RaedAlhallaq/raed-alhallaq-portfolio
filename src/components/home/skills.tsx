import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { skills } from '@/data'
import type { Skill, SkillCategory, SkillLevel } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const CATEGORY_LABEL: Record<SkillCategory, { en: string; ar: string }> = {
  frontend: { en: 'Frontend', ar: 'الواجهات الأمامية' },
  backend: { en: 'Backend & data', ar: 'الخلفية والبيانات' },
  languages: { en: 'Languages & fundamentals', ar: 'اللغات والأساسيات' },
  tools: { en: 'Tools & workflow', ar: 'الأدوات وسير العمل' },
}

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'languages', 'tools']

const COPY = {
  eyebrow: { en: '03 — Skills', ar: '03 — المهارات' },
  title: { en: 'A focused toolkit.', ar: 'صندوق أدوات مركّز.' },
  description: {
    en: 'The technologies I reach for most — grouped by how I use them, without invented ratings.',
    ar: 'التقنيات التي أعتمد عليها أكثر — مجمّعة حسب طريقة استخدامي لها، دون تقييمات مُختلقة.',
  },
  meta: { en: 'Tools & fundamentals', ar: 'أدوات وأساسيات' },
  legend: { en: 'Level reflects depth of use', ar: 'المستوى يعكس عمق الاستخدام' },
}

const LEVEL_LABEL: Record<SkillLevel, { en: string; ar: string }> = {
  core: { en: 'Core', ar: 'أساسي' },
  working: { en: 'Working', ar: 'عملي' },
  familiar: { en: 'Familiar', ar: 'مألوف' },
}

function SkillRow({ skill }: { skill: Skill }) {
  const { language } = useLanguage()
  const level = skill.level ?? 'core'

  return (
    <li className="group flex items-baseline justify-between gap-4 border-b border-line/70 py-3 last:border-b-0">
      <span className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
        {localize(skill.name, language)}
      </span>
      <span
        className={
          level === 'core'
            ? 'label-mono shrink-0 text-accent'
            : 'label-mono shrink-0'
        }
      >
        {localize(LEVEL_LABEL[level], language)}
      </span>
    </li>
  )
}

export function Skills() {
  const { language } = useLanguage()

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.items.length > 0)

  return (
    <Section id="skills">
      <div className="container-page">
        <Reveal>
          <SectionIntro
            id="skills-heading"
            eyebrow={localize(COPY.eyebrow, language)}
            title={localize(COPY.title, language)}
            description={localize(COPY.description, language)}
            meta={`${String(skills.length).padStart(2, '0')} — ${localize(COPY.meta, language)}`}
          />
        </Reveal>

        <div className="mt-14 border-t border-line">
          {grouped.map((group, index) => (
            <Reveal
              key={group.category}
              delay={index * 50}
              className="grid gap-5 border-b border-line py-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <p className="label-mono text-accent">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="display-sm mt-2">{localize(CATEGORY_LABEL[group.category], language)}</h3>
                <p className="label-mono mt-2">
                  {String(group.items.length).padStart(2, '0')}
                </p>
              </div>

              <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-9">
                {group.items.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="label-mono mt-6">{localize(COPY.legend, language)}</p>
        </Reveal>
      </div>
    </Section>
  )
}
