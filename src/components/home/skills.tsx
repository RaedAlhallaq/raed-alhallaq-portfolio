import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { skills } from '@/data'
import type { Skill, SkillCategory } from '@/types'
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
  eyebrow: { en: '02 — Skills', ar: '02 — المهارات' },
  title: { en: 'A focused toolkit.', ar: 'صندوق أدوات مركّز.' },
  description: {
    en: 'The technologies I reach for most — grouped by how I use them, without invented ratings.',
    ar: 'التقنيات التي أعتمد عليها أكثر — مجمّعة حسب طريقة استخدامي لها، دون تقييمات مُختلقة.',
  },
}

function SkillTag({ skill }: { skill: Skill }) {
  const { language } = useLanguage()

  return (
    <li>
      <span
        className="inline-flex min-h-10 items-center border border-border px-3 text-sm text-foreground outline-none transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:border-accent focus-visible:bg-accent focus-visible:text-white"
        title={localize(skill.name, language)}
      >
        {localize(skill.name, language)}
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

        {/* Each group is a bordered cell in one continuous editorial grid. */}
        <div className="mt-14 grid border-s border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {grouped.map((group, index) => (
            <Reveal
              key={group.category}
              delay={index * 50}
              className="min-h-44 border-b border-e border-border p-6"
            >
              <h3 className="flex items-baseline justify-between gap-3 text-sm font-semibold tracking-tight">
                {localize(CATEGORY_LABEL[group.category], language)}
                <span className="font-mono text-[0.625rem] font-normal text-muted-foreground">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <SkillTag key={skill.id} skill={skill} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
