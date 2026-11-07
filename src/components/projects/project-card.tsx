import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { ProjectVisual } from './project-visual'
import { ProjectLinks } from './project-links'
import { CATEGORY_LABELS, VIEW_DETAILS_LABEL, ownershipEvidenceLabel } from './project-labels'

export type ProjectLayout = 'feature' | 'media-left' | 'media-right' | 'banner'

interface ProjectCardProps {
  project: Project
  index: number
  layout?: ProjectLayout
}

const ASPECTS = [
  'aspect-[4/3]',
  'aspect-[5/4]',
  'aspect-square',
  'aspect-[16/10]',
  'aspect-[4/3]',
]

interface ProjectTextProps {
  project: Project
  index: number
  align?: 'start' | 'end'
  showMeta?: boolean
}

function ProjectText({ project, index, align = 'start', showMeta = true }: ProjectTextProps) {
  const { language } = useLanguage()

  const title = localize(project.title, language)
  const categoryLabel = project.category ? localize(CATEGORY_LABELS[project.category], language) : null
  const ownershipLabel = ownershipEvidenceLabel(project, language)

  return (
    <div className={cn(align === 'end' && 'lg:text-end')}>
      {showMeta ? (
        <div
          className={cn(
            'label-mono flex flex-wrap items-center gap-x-3 gap-y-1',
            align === 'end' && 'lg:justify-end',
          )}
        >
          <span className="text-accent">{String(index).padStart(2, '0')}</span>
          <span aria-hidden="true">/</span>
          {categoryLabel ? <span>{categoryLabel}</span> : null}
          <span aria-hidden="true">·</span>
          <span>{ownershipLabel}</span>
        </div>
      ) : null}

      <h3 className={cn('display-md', showMeta && 'mt-4')}>
        <Link
          to={`/projects/${project.slug}`}
          className="link-underline decoration-accent"
        >
          {title}
          <span className="sr-only"> — {localize(VIEW_DETAILS_LABEL, language)}</span>
        </Link>
      </h3>

      <p
        className={cn(
          'mt-4 max-w-[46ch] text-sm leading-relaxed text-muted-foreground',
          align === 'end' && 'lg:ms-auto',
        )}
      >
        {localize(project.summary, language)}
      </p>

      {project.stack && project.stack.length > 0 ? (
        <p
          className={cn(
            'label-mono mt-5 normal-case leading-relaxed tracking-normal text-muted-foreground',
          )}
        >
          {project.stack.join(' · ')}
        </p>
      ) : null}

      <div
        className={cn(
          'mt-6 flex flex-wrap items-center gap-x-5 gap-y-3',
          align === 'end' && 'lg:justify-end',
        )}
      >
        <ProjectLinks project={project} />
        <Link
          to={`/projects/${project.slug}`}
          className="group/cta inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent"
        >
          {localize(VIEW_DETAILS_LABEL, language)}
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 rtl:-scale-x-100"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}

export function ProjectCard({ project, index, layout = 'media-right' }: ProjectCardProps) {
  const { language } = useLanguage()
  const aspect = ASPECTS[(index - 1) % ASPECTS.length]

  const visual = (className: string) => (
    <Link
      to={`/projects/${project.slug}`}
      tabIndex={-1}
      aria-hidden="true"
      className="group/visual block overflow-hidden"
    >
      <ProjectVisual
        project={project}
        index={index}
        className={cn(
          'w-full transition-transform duration-700 ease-out group-hover/visual:scale-[1.015]',
          className,
        )}
      />
    </Link>
  )

  if (layout === 'feature') {
    return (
      <article className="group relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-4">
            <ProjectText project={project} index={index} />
          </div>
          <div className="lg:col-span-8">
            {visual('aspect-[4/3] sm:aspect-[16/10]')}
          </div>
        </div>
      </article>
    )
  }

  if (layout === 'banner') {
    const categoryLabel = project.category
      ? localize(CATEGORY_LABELS[project.category], language)
      : null
    const ownershipLabel = ownershipEvidenceLabel(project, language)

    return (
      <article className="group relative">
        <div className="space-y-6">
          {visual('aspect-[16/9] sm:aspect-[21/9]')}
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="display-xl text-accent">{String(index).padStart(2, '0')}</p>
              <p className="label-mono mt-3">
                {categoryLabel ?? '—'} · {ownershipLabel}
              </p>
              {project.stack && project.stack.length > 0 ? (
                <p className="label-mono mt-4 normal-case leading-relaxed tracking-normal">
                  {project.stack.join(' · ')}
                </p>
              ) : null}
            </div>
            <div className="lg:col-span-8">
              <ProjectText project={project} index={index} showMeta={false} />
            </div>
          </div>
        </div>
      </article>
    )
  }

  const mediaLeft = layout === 'media-left'

  return (
    <article className="group relative">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div
          className={cn(
            'lg:col-span-7',
            mediaLeft ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {visual(cn(aspect, 'w-full'))}
        </div>
        <div
          className={cn(
            'lg:col-span-5',
            mediaLeft ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          <ProjectText project={project} index={index} align={mediaLeft ? 'end' : 'start'} />
        </div>
      </div>
    </article>
  )
}
