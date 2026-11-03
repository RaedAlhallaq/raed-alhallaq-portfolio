import { Braces, LayoutGrid, Server, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { skills } from '@/data'
import type { Skill, SkillCategory, SkillLevel } from '@/types'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const CATEGORY_META: Record<SkillCategory, { label: { en: string; ar: string }; icon: LucideIcon }> = {
  frontend: {
    label: { en: 'Frontend', ar: 'الواجهات الأمامية' },
    icon: LayoutGrid,
  },
  backend: {
    label: { en: 'Backend & data', ar: 'الخلفية والبيانات' },
    icon: Server,
  },
  languages: {
    label: { en: 'Languages & fundamentals', ar: 'اللغات والأساسيات' },
    icon: Braces,
  },
  tools: {
    label: { en: 'Tools & workflow', ar: 'الأدوات وسير العمل' },
    icon: Wrench,
  },
}

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'languages', 'tools']

const COPY = {
  eyebrow: { en: '03 · Skills', ar: '03 · المهارات' },
  title: { en: 'A focused toolkit.', ar: 'صندوق أدوات مركّز.' },
  description: {
    en: 'The technologies I reach for most — grouped by how I use them, without invented ratings.',
    ar: 'التقنيات التي أعتمد عليها أكثر — مجمّعة حسب طريقة استخدامي لها، دون تقييمات مُختلقة.',
  },
  legend: { en: 'Visual weight reflects depth of use', ar: 'ثقل العرض يعكس عمق الاستخدام' },
}

const LEVEL_LABEL: Record<SkillLevel, { en: string; ar: string }> = {
  core: { en: 'Core', ar: 'أساسي' },
  working: { en: 'Working', ar: 'عملي' },
  familiar: { en: 'Familiar', ar: 'مألوف' },
}

function chipClasses(level: SkillLevel = 'core') {
  if (level === 'core') return 'border-border-strong bg-muted/60 text-foreground'
  if (level === 'working') return 'border-border bg-background text-foreground'
  return 'border-border/60 bg-transparent text-muted-foreground'
}

function SkillChip({ skill, large = false }: { skill: Skill; large?: boolean }) {
  const { language } = useLanguage()
  const level = skill.level ?? 'core'

  return (
    <li
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border font-medium transition-colors',
        large ? 'px-3.5 py-2 text-sm' : 'px-3 py-1.5 text-xs',
        chipClasses(level),
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          level === 'core' ? 'bg-brand' : level === 'working' ? 'bg-brand/50' : 'bg-border-strong',
        )}
      />
      {localize(skill.name, language)}
    </li>
  )
}

function SkillCard({
  category,
  items,
  large = false,
  index,
}: {
  category: SkillCategory
  items: Skill[]
  large?: boolean
  index: number
}) {
  const { language } = useLanguage()
  const meta = CATEGORY_META[category]
  const Icon = meta.icon

  return (
    <div
      className={cn(
        'card-surface flex h-full flex-col p-5 sm:p-6',
        large && 'bg-gradient-to-br from-card to-muted/40',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={cn('font-semibold tracking-tight', large ? 'text-lg' : 'text-base')}>
            {localize(meta.label, language)}
          </h3>
        </div>
        <span className="tech-label">{String(index).padStart(2, '0')}</span>
      </div>

      <ul className={cn('mt-5 flex flex-wrap', large ? 'gap-2.5' : 'gap-2')}>
        {items.map((skill) => (
          <SkillChip key={skill.id} skill={skill} large={large} />
        ))}
      </ul>

      <p className="tech-label mt-auto pt-6 text-[0.625rem] normal-case tracking-normal">
        {items.length} {language === 'ar' ? 'عناصر' : 'items'}
      </p>
    </div>
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14">
          {grouped.map((group, index) => (
            <Reveal
              key={group.category}
              delay={index * 60}
              className={cn(group.category === 'frontend' && 'sm:col-span-2')}
            >
              <SkillCard
                category={group.category}
                items={group.items}
                large={group.category === 'frontend'}
                index={index + 1}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {(['core', 'working', 'familiar'] as SkillLevel[]).map((level) => (
              <li key={level} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 rounded-full',
                    level === 'core' ? 'bg-brand' : level === 'working' ? 'bg-brand/50' : 'bg-border-strong',
                  )}
                />
                {localize(LEVEL_LABEL[level], language)}
              </li>
            ))}
            <li className="tech-label ms-auto text-[0.625rem] normal-case tracking-normal">
              {localize(COPY.legend, language)}
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
