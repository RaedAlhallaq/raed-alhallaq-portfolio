import { useMemo, useState } from 'react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { projects } from '@/data'
import type { Project, ProjectCategory } from '@/types'
import { CategoryFilter } from './category-filter'
import { ProjectCard } from './project-card'
import { stableProjectIndex } from './project-index'
import { Reveal } from '@/components/shared/reveal'
import { EMPTY_CATEGORY_TEXT } from './project-labels'

const CATEGORY_ORDER: ProjectCategory[] = ['full-stack', 'frontend', 'backend']

interface ProjectsGridProps {
  showDetailedView?: boolean
}

export function ProjectsGrid({ showDetailedView = true }: ProjectsGridProps) {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null)

  const availableCategories = useMemo(() => {
    const present = new Set<ProjectCategory>()
    for (const project of projects) {
      if (project.category) present.add(project.category)
    }
    return CATEGORY_ORDER.filter((category) => present.has(category))
  }, [])

  const visibleProjects: Project[] = activeCategory
    ? projects.filter((project) => project.category === activeCategory)
    : projects

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <p className="tech-label text-[0.625rem]">
          {visibleProjects.length} / {projects.length}
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <ol
          aria-label={localize({ en: 'Projects', ar: 'المشاريع' }, language)}
          className="grid gap-5 sm:grid-cols-2"
        >
          {visibleProjects.map((project, position) => (
            <li key={project.slug} className="h-full">
              <Reveal delay={Math.min(position, 4) * 50} className="h-full">
                <ProjectCard
                  project={project}
                  index={stableProjectIndex(project.slug)}
                  showDetailedView={showDetailedView}
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
    </div>
  )
}
