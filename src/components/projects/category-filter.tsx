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
    <div
      role="group"
      aria-label={localize({ en: 'Filter projects by category', ar: 'تصفية المشاريع حسب الفئة' }, language)}
    >
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
                  'rounded-sm border-b py-0.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                  isActive
                    ? 'border-foreground font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground',
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
