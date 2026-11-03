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
    <li className="flex items-baseline justify-between gap-4 border-b border-border/70 py-2.5">
      <span className="text-sm text-foreground">{localize(skill.name, language)}</span>
      <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
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
          />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {grouped.map((group, index) => (
            <Reveal key={group.category} delay={index * 50}>
              <div className="border-t border-border pt-5">
                <h3 className="flex items-baseline justify-between gap-3 text-sm font-semibold tracking-tight">
                  {localize(CATEGORY_LABEL[group.category], language)}
                  <span className="font-mono text-[0.625rem] font-normal text-muted-foreground">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </h3>
                <ul className="mt-3">
                  {group.items.map((skill) => (
                    <SkillRow key={skill.id} skill={skill} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-xs text-muted-foreground">{localize(COPY.legend, language)}</p>
        </Reveal>
      </div>
    </Section>
  )
}
