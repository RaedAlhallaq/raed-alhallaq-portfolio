import { Link } from 'react-router-dom'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { ProjectVisual } from './project-visual'
import { ProjectLinks } from './project-links'
import { CATEGORY_LABELS, VIEW_DETAILS_LABEL, ownershipEvidenceLabel } from './project-labels'

interface ProjectCardProps {
  project: Project
  index: number
  wide?: boolean
}

export function ProjectCard({ project, index, wide = false }: ProjectCardProps) {
  const { language } = useLanguage()

  const title = localize(project.title, language)
  const categoryLabel = project.category ? localize(CATEGORY_LABELS[project.category], language) : null
  const ownershipLabel = ownershipEvidenceLabel(project, language)

  return (
    <article className="group relative flex h-full flex-col">
      {/* Visual frame: thin inner border appears on hover like the reference grid. */}
      <div className="relative overflow-hidden border border-border transition-colors group-hover:border-transparent">
        <ProjectVisual
          project={project}
          index={index}
          className={cn(
            'w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]',
            wide ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[4/3]',
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Title row with a red editorial index. */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className={cn('font-semibold tracking-tight', wide ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg')}>
          <Link
            to={`/projects/${project.slug}`}
            className="rounded-sm text-foreground outline-none transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {title}
            <span className="sr-only"> — {localize(VIEW_DETAILS_LABEL, language)}</span>
          </Link>
        </h3>
        <span className="num-display shrink-0 font-mono text-sm sm:text-base">
          {String(index).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span>{categoryLabel ?? '—'}</span>
        <span aria-hidden="true">·</span>
        <span>{ownershipLabel}</span>
      </div>

      <p
        className={cn(
          'mt-3 text-sm leading-relaxed text-muted-foreground',
          wide ? 'max-w-[62ch] sm:text-base' : 'line-clamp-2',
        )}
      >
        {localize(project.summary, language)}
      </p>

      {/* Stack line + links footer, the card's contact shadow row. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <span className="tech-label max-w-[60%] truncate">
          {project.stack?.slice(0, wide ? 5 : 3).join(' · ')}
        </span>
        <div className="pointer-events-none relative z-10 flex items-center gap-3">
          <div className="pointer-events-auto">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}
