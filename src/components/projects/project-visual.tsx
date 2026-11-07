import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { CATEGORY_LABELS } from './project-labels'

interface ProjectVisualProps {
  project: Project
  index?: number
  className?: string
}

const WASHES = [
  'project-visual--a',
  'project-visual--b',
  'project-visual--c',
  'project-visual--d',
  'project-visual--e',
]

const GLYPH_POSITION = [
  '-end-4 -top-10',
  '-end-8 top-1/2 -translate-y-1/2',
  '-bottom-14 -start-8',
  '-top-12 start-1/3',
  '-end-10 top-1/3',
]

const ACCENT_POSITION = [
  'start-0 top-0 h-24 w-1',
  'end-0 top-1/2 h-1 w-24',
  'start-4 top-1/2 size-3',
  'end-4 bottom-16 h-16 w-1',
  'start-0 bottom-0 h-1 w-28',
]

/**
 * Image-free project identity panel. Every project has an empty images array,
 * so the gallery is built from typography, a technical grid, and one accent
 * mark. Real screenshots render automatically once project.images is filled.
 */
export function ProjectVisual({ project, index = 1, className }: ProjectVisualProps) {
  const { language } = useLanguage()

  if (project.images.length > 0) {
    return (
      <div className={cn('relative overflow-hidden border border-line bg-surface', className)}>
        <img
          src={project.images[0].src}
          alt={localize(project.images[0].alt, language)}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  const title = localize(project.title, language)
  const glyph = Array.from(title.trim())[0] ?? '·'
  const category = project.category ? localize(CATEGORY_LABELS[project.category], language) : null
  const variant = (index - 1) % WASHES.length
  const stack = project.stack?.slice(0, 3).join(' · ') ?? ''

  return (
    <div
      aria-hidden="true"
      className={cn(
        'project-visual select-none border border-line',
        WASHES[variant],
        className,
      )}
    >
      <span className="label-mono absolute start-4 top-4 z-10 text-foreground/55">
        {String(index).padStart(2, '0')}
      </span>
      {category ? (
        <span className="label-mono absolute end-4 top-4 z-10 max-w-[55%] truncate text-foreground/55">
          {category}
        </span>
      ) : null}

      <span
        className={cn(
          'display-outline pointer-events-none absolute font-display text-[clamp(6.5rem,17vw,14rem)] font-extrabold leading-none opacity-80',
          GLYPH_POSITION[variant],
        )}
      >
        {glyph}
      </span>

      <span
        className={cn('pointer-events-none absolute bg-accent', ACCENT_POSITION[variant])}
      />

      <span className="absolute inset-x-4 bottom-12 z-10 max-w-[86%] text-balance font-display text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
        {title}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-line bg-background/45 px-4 py-3 backdrop-blur-sm">
        <span className="label-mono truncate">{stack}</span>
        <span className="label-mono shrink-0 text-accent">↗</span>
      </div>
    </div>
  )
}
