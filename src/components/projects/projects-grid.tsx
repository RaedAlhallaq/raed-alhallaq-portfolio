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

export function ProjectsGrid() {
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
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
          {String(visibleProjects.length).padStart(2, '0')} / {String(showcaseProjects.length).padStart(2, '0')}
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <ol
          aria-label={localize({ en: 'Projects', ar: 'المشاريع' }, language)}
          className="grid gap-x-8 gap-y-14 sm:grid-cols-2"
        >
          {visibleProjects.map((project, position) => (
            <li key={project.slug} className={cn(position === 0 && 'sm:col-span-2')}>
              <Reveal delay={Math.min(position, 4) * 40} className="h-full">
                <ProjectCard
                  project={project}
                  index={stableProjectIndex(project.slug)}
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
        <section aria-labelledby="other-projects-heading" className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-border pt-6">
            <div>
              <h3 id="other-projects-heading" className="text-lg font-semibold tracking-tight">
                {localize(OTHER_PROJECTS_TITLE, language)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(OTHER_PROJECTS_TEXT, language)}
              </p>
            </div>
            <span className="font-mono text-[0.625rem] text-muted-foreground">
              {String(otherProjects.length).padStart(2, '0')}
            </span>
          </div>

          <ul className="mt-4">
            {otherProjects.map((project) => {
              const title = localize(project.title, language)
              return (
                <li key={project.slug} className="border-t border-border last:border-b">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/40 sm:grid-cols-[3rem_minmax(0,1fr)_10rem_auto]"
                  >
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(stableProjectIndex(project.slug)).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-medium tracking-tight transition-colors group-hover:underline group-hover:underline-offset-4">
                        {title}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {localize(project.summary, language)}
                      </span>
                    </span>
                    <span className="hidden truncate text-xs text-muted-foreground sm:block">
                      {project.stack?.join(' · ')}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-gilt rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
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
