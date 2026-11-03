import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { projects } from '@/data'
import type { Project, ProjectCategory } from '@/types'
import { CategoryFilter } from './category-filter'
import { ProjectCard } from './project-card'
import { stableProjectIndex } from './project-index'
import { Reveal } from '@/components/shared/reveal'
import {
  EMPTY_CATEGORY_TEXT,
  OTHER_PROJECTS_TEXT,
  OTHER_PROJECTS_TITLE,
} from './project-labels'

const CATEGORY_ORDER: ProjectCategory[] = ['full-stack', 'frontend', 'backend']

interface ProjectsGridProps {
  showDetailedView?: boolean
}

export function ProjectsGrid({ showDetailedView = true }: ProjectsGridProps) {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null)

  const showcaseProjects = useMemo(() => projects.filter((project) => !project.secondary), [])
  const otherProjects = useMemo(() => projects.filter((project) => project.secondary), [])

  const availableCategories = useMemo(() => {
    const present = new Set<ProjectCategory>()
    for (const project of showcaseProjects) {
      if (project.category) present.add(project.category)
    }
    return CATEGORY_ORDER.filter((category) => present.has(category))
  }, [showcaseProjects])

  const visibleProjects: Project[] = activeCategory
    ? showcaseProjects.filter((project) => project.category === activeCategory)
    : showcaseProjects

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <p className="tech-label rounded-full border border-border bg-card px-3 py-1.5 text-[0.625rem]">
          {visibleProjects.length} / {showcaseProjects.length}
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <ol
          aria-label={localize({ en: 'Projects', ar: 'المشاريع' }, language)}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {visibleProjects.map((project, position) => (
            <li key={project.slug} className={cn('h-full', position === 0 && 'sm:col-span-2')}>
              <Reveal delay={Math.min(position, 4) * 50} className="h-full">
                <ProjectCard
                  project={project}
                  index={stableProjectIndex(project.slug)}
                  showDetailedView={showDetailedView}
                  wide={position === 0}
                />
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status" className="text-sm text-muted-foreground">
          {localize(EMPTY_CATEGORY_TEXT, language)}
        </p>
      )}

      {otherProjects.length > 0 ? (
        <section
          aria-labelledby="other-projects-heading"
          className="mt-4 overflow-hidden rounded-[1.5rem] border border-border/80 bg-card shadow-soft"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
            <div>
              <h3 id="other-projects-heading" className="text-sm font-semibold tracking-tight">
                {localize(OTHER_PROJECTS_TITLE, language)}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {localize(OTHER_PROJECTS_TEXT, language)}
              </p>
            </div>
            <span className="tech-label text-[0.625rem]">
              {String(otherProjects.length).padStart(2, '0')}
            </span>
          </div>

          <ul className="grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {otherProjects.map((project) => {
              const title = localize(project.title, language)
              return (
                <li key={project.slug} className="bg-card">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group flex h-full flex-col gap-2.5 p-5 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="tech-label text-[0.625rem]">
                      {String(stableProjectIndex(project.slug)).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold leading-snug transition-colors group-hover:text-brand">
                      {title}
                    </span>
                    <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {localize(project.summary, language)}
                    </span>
                    <span className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3">
                      <span className="truncate text-[0.6875rem] text-muted-foreground">
                        {project.stack?.join(' · ')}
                      </span>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
