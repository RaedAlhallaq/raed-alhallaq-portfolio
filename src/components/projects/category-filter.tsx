import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { ProjectCategory } from '@/types'
import { ALL_CATEGORIES_LABEL, CATEGORY_LABELS } from './project-labels'

interface CategoryFilterProps {
  categories: ProjectCategory[]
  active: ProjectCategory | null
  onSelect: (category: ProjectCategory | null) => void
}

export function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  const { language } = useLanguage()

  const options: Array<ProjectCategory | null> = [null, ...categories]

  return (
    <div role="group" aria-label={localize({ en: 'Filter projects by category', ar: 'تصفية المشاريع حسب الفئة' }, language)}>
      <ul className="flex flex-wrap items-center gap-2">
        {options.map((category) => {
          const isActive = category === active
          const label = category
            ? localize(CATEGORY_LABELS[category], language)
            : localize(ALL_CATEGORIES_LABEL, language)
          return (
            <li key={category ?? 'all'}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category)}
                className={cn(
                  'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
                  isActive
                    ? 'border-brand bg-brand text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground',
                )}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
