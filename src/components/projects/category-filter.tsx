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
      aria-label={localize(
        { en: 'Filter projects by category', ar: 'تصفية المشاريع حسب الفئة' },
        language,
      )}
    >
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
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
                  'inline-flex min-h-11 items-center gap-2 px-2.5 text-sm transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1 bg-accent transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
