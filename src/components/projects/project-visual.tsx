import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'

interface ProjectVisualProps {
  project: Project
  index?: number
  className?: string
}

const WASHES = [
  'linear-gradient(155deg, color-mix(in oklch, var(--foreground) 9%, var(--background)), var(--background) 72%)',
  'linear-gradient(135deg, color-mix(in oklch, var(--foreground) 5%, var(--background)), var(--background) 64%)',
  'linear-gradient(170deg, color-mix(in oklch, var(--foreground) 12%, var(--background)), var(--background) 76%)',
  'linear-gradient(145deg, color-mix(in oklch, var(--foreground) 4%, var(--background)), var(--background) 58%)',
]

/**
 * Image-free project identity panel: a quiet ink wash, a faint technical
 * grid, and the project's initial as a large editorial monogram. Real
 * screenshots render automatically once project.images is populated.
 */
export function ProjectVisual({ project, index = 1, className }: ProjectVisualProps) {
  const { language } = useLanguage()

  if (project.images.length > 0) {
    return (
      <div className={cn('relative overflow-hidden bg-muted', className)}>
        <img
          src={project.images[0].src}
          alt={localize(project.images[0].alt, language)}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  const glyph = Array.from(localize(project.title, language).trim())[0] ?? '·'
  const wash = WASHES[(index - 1) % WASHES.length]

  return (
    <div
      aria-hidden="true"
      className={cn('relative select-none overflow-hidden bg-muted', className)}
      style={{ backgroundImage: wash }}
    >
      <div className="line-grid absolute inset-0 opacity-70" />

      <span className="absolute start-4 top-3.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground">
        {String(index).padStart(2, '0')}
      </span>

      <span className="absolute -bottom-8 end-2 font-serif text-[7rem] leading-none text-foreground/15 sm:text-[9rem]">
        {glyph}
      </span>

      <span className="absolute bottom-4 start-4 max-w-[70%] font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        {project.stack?.[0] ?? ''}
      </span>
    </div>
  )
}
