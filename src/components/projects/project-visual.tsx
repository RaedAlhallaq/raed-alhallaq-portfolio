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
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 16%, var(--card)), var(--card) 68%)',
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 9%, var(--card)), var(--card) 72%)',
  'linear-gradient(160deg, color-mix(in oklch, var(--brand) 20%, var(--card)), var(--card) 74%)',
  'linear-gradient(145deg, color-mix(in oklch, var(--brand) 6%, var(--card)), var(--card) 60%)',
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
      className={cn('relative select-none overflow-hidden bg-card', className)}
      style={{ backgroundImage: gradient }}
    >
      <div className="line-grid absolute inset-0 opacity-70" />
      <div className="absolute -end-12 -top-12 size-40 rounded-full bg-brand/15 blur-2xl" />

      <span className="tech-label absolute start-4 top-4 text-[0.625rem]">
        {String(index).padStart(2, '0')}
      </span>
      <span className="absolute end-5 top-5 size-2 rounded-full bg-brand" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-semibold tracking-tight text-foreground/75 sm:text-6xl">{glyph}</span>
        {project.stack?.[0] ? (
          <span className="mt-3 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm">
            {project.stack[0]}
          </span>
        ) : null}
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
        <span className="h-px flex-1 bg-border/80" />
        <span className="tech-label text-[0.5625rem]">{localize({ en: 'Project', ar: 'مشروع' }, language)}</span>
        <span className="h-px flex-1 bg-border/80" />
      </div>
    </div>
  )
}
