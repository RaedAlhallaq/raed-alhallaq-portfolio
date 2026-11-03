import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { ProjectVisual } from './project-visual'
import { ProjectLinks } from './project-links'
import {
  CATEGORY_LABELS,
  VIEW_DETAILS_LABEL,
  ownershipEvidenceLabel,
} from './project-labels'

interface ProjectCardProps {
  project: Project
  index: number
  showDetailedView?: boolean
  wide?: boolean
}

export function ProjectCard({ project, index, showDetailedView = true, wide = false }: ProjectCardProps) {
  const { language } = useLanguage()

  const title = localize(project.title, language)
  const categoryLabel = project.category ? localize(CATEGORY_LABELS[project.category], language) : null
  const ownershipLabel = ownershipEvidenceLabel(project, language)

  return (
    <article className="tile-interactive group flex h-full flex-col overflow-hidden">
      <ProjectVisual
        project={project}
        index={index}
        className={cn('border-b border-border/70', wide ? 'aspect-[16/9] sm:aspect-[21/8]' : 'aspect-[16/10]')}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow">{categoryLabel ?? '—'}</span>
          <span className="tech-label text-[0.625rem]">{ownershipLabel}</span>
        </div>

        <h3
          className={cn(
            'mt-2.5 font-semibold tracking-tight transition-colors group-hover:text-brand',
            wide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            'mt-2 text-sm leading-relaxed text-muted-foreground',
            wide ? 'max-w-[70ch] sm:text-base' : 'line-clamp-3',
          )}
        >
          {localize(project.summary, language)}
        </p>

        {project.stack && project.stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, wide ? 6 : 4).map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-0.5 text-[0.6875rem] text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border/60 pt-5">
          <ProjectLinks project={project} />

          {showDetailedView ? (
            <Link
              to={`/projects/${project.slug}`}
              aria-label={`${localize(VIEW_DETAILS_LABEL, language)} — ${title}`}
              className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-semibold text-foreground outline-none transition-colors hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {localize(VIEW_DETAILS_LABEL, language)}
              <ArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
