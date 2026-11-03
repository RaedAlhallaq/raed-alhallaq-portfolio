import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
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
      <div className="overflow-hidden">
        <ProjectVisual
          project={project}
          index={index}
          className={cn(
            'w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]',
            wide ? 'aspect-[16/10] sm:aspect-[21/9]' : 'aspect-[4/3]',
          )}
        />
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className={cn('font-semibold tracking-tight', wide ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl')}>
          <Link
            to={`/projects/${project.slug}`}
            className="rounded-sm underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {title}
            <span className="sr-only"> — {localize(VIEW_DETAILS_LABEL, language)}</span>
          </Link>
        </h3>
        <span className="shrink-0 font-mono text-[0.625rem] text-muted-foreground">
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-[0.6875rem] text-muted-foreground">
          {project.stack?.slice(0, wide ? 5 : 3).join(' · ')}
        </span>
        <div className="pointer-events-none relative z-10 flex items-center gap-3">
          <div className="pointer-events-auto">
            <ProjectLinks project={project} />
          </div>
          <ArrowUpRight
            className="hidden size-4 text-muted-foreground transition-colors group-hover:text-foreground sm:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  )
}
