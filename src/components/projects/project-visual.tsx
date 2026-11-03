import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'

interface ProjectVisualProps {
  project: Project
  index?: number
  className?: string
}

const GRADIENTS = [
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 18%, var(--card)), var(--card) 70%)',
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 10%, var(--card)), var(--card) 72%)',
  'linear-gradient(160deg, color-mix(in oklch, var(--brand) 24%, var(--card)), var(--card) 76%)',
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 7%, var(--card)), var(--card) 62%)',
]

/**
 * Image-free project identity panel: a soft brand gradient, a faint technical
 * grid, and the project's initial as a quiet monogram. Real screenshots render
 * automatically once project.images is populated.
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
  const gradient = GRADIENTS[(index - 1) % GRADIENTS.length]

  return (
    <div
      aria-hidden="true"
      className={cn('relative select-none overflow-hidden bg-muted', className)}
      style={{ backgroundImage: gradient }}
    >
      <div className="line-grid absolute inset-0 opacity-60" />
      <div className="absolute -end-10 -top-10 size-36 rounded-full bg-brand/15 blur-2xl" />

      <span className="tech-label absolute start-4 top-3.5 text-[0.625rem]">
        {String(index).padStart(2, '0')}
      </span>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="grid size-16 place-items-center rounded-2xl border border-border/60 bg-background/70 text-2xl font-semibold tracking-tight text-foreground/80 shadow-soft backdrop-blur-sm">
          {glyph}
        </span>
        {project.stack?.[0] ? (
          <span className="mt-3 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm">
            {project.stack[0]}
          </span>
        ) : null}
      </div>

      <span className="absolute end-4 bottom-3.5 size-2 rounded-full bg-brand" />
    </div>
  )
}
