import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
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

const COPY = {
  search: {
    label: { en: 'Search projects', ar: 'ابحث في المشاريع' },
    placeholder: { en: 'Search by name or stack…', ar: 'ابحث بالاسم أو التقنية…' },
    empty: { en: 'No projects match your search.', ar: 'لا توجد مشاريع مطابقة للبحث.' },
  },
}

function matchesQuery(project: Project, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true
  const haystack = [
    localize(project.title, 'en'),
    localize(project.title, 'ar'),
    localize(project.summary, 'en'),
    localize(project.summary, 'ar'),
    ...(project.stack ?? []),
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(normalized)
}

export function ProjectsGrid() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null)
  const [query, setQuery] = useState('')

  const showcaseProjects = useMemo(() => projects.filter((project) => !project.secondary), [])
  const otherProjects = useMemo(() => projects.filter((project) => project.secondary), [])

  const availableCategories = useMemo(() => {
    const present = new Set<ProjectCategory>()
    for (const project of showcaseProjects) {
      if (project.category) present.add(project.category)
    }
    return CATEGORY_ORDER.filter((category) => present.has(category))
  }, [showcaseProjects])

  const visibleProjects: Project[] = useMemo(() => {
    let list = activeCategory
      ? showcaseProjects.filter((project) => project.category === activeCategory)
      : showcaseProjects
    list = list.filter((project) => matchesQuery(project, query))
    return list
  }, [activeCategory, showcaseProjects, query])

  const otherVisible = useMemo(
    () => otherProjects.filter((project) => matchesQuery(project, query)),
    [otherProjects, query],
  )

  const isFiltering = Boolean(activeCategory) || query.trim().length > 0

  return (
    <div className="flex flex-col gap-8">
      {/* Filter + search toolbar */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border pb-4">
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="ms-auto flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute start-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label className="sr-only" htmlFor="projects-search">
              {localize(COPY.search.label, language)}
            </label>
            <input
              id="projects-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={localize(COPY.search.placeholder, language)}
              className="min-h-10 w-44 border border-border bg-transparent ps-8 pe-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-border-strong focus:border-accent sm:w-56"
            />
          </div>
          <p
            className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground"
            aria-live="polite"
          >
            {String(visibleProjects.length).padStart(2, '0')} / {String(showcaseProjects.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <ol
          aria-label={localize({ en: 'Projects', ar: 'المشاريع' }, language)}
          className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, position) => (
            <li key={project.slug}>
              <Reveal delay={Math.min(position, 4) * 40} className="h-full">
                <ProjectCard
                  project={project}
                  index={stableProjectIndex(project.slug)}
                  wide={position === 0 && !isFiltering}
                />
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        <p role="status" className="text-sm text-muted-foreground">
          {localize(
            query.trim() ? COPY.search.empty : EMPTY_CATEGORY_TEXT,
            language,
          )}
        </p>
      )}

      {otherVisible.length > 0 ? (
        <section aria-labelledby="other-projects-heading" className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-border pt-6">
            <div>
              <h3 id="other-projects-heading" className="display text-xl uppercase">
                {localize(OTHER_PROJECTS_TITLE, language)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {localize(OTHER_PROJECTS_TEXT, language)}
              </p>
            </div>
            <span className="font-mono text-[0.625rem] text-accent">
              {String(otherVisible.length).padStart(2, '0')}
            </span>
          </div>

          <ul className="mt-4">
            {otherVisible.map((project) => {
              const title = localize(project.title, language)
              return (
                <li key={project.slug} className="border-t border-border last:border-b">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-accent/40 sm:grid-cols-[3rem_minmax(0,1fr)_10rem_auto]"
                  >
                    <span className="num-display font-mono text-sm">
                      {String(stableProjectIndex(project.slug)).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-medium tracking-tight transition-colors group-hover:text-accent">
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
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent rtl:rotate-180 rtl:group-hover:-translate-x-1"
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
