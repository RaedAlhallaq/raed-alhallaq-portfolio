import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { projects } from '@/data'
import type { Project, ProjectCategory } from '@/types'
import { CategoryFilter } from './category-filter'
import { ProjectCard, type ProjectLayout } from './project-card'
import { stableProjectIndex } from './project-index'
import { Reveal } from '@/components/shared/reveal'
import {
  EMPTY_CATEGORY_TEXT,
  LINK_TYPE_LABELS,
  OTHER_PROJECTS_TEXT,
  OTHER_PROJECTS_TITLE,
  VIEW_DETAILS_LABEL,
} from './project-labels'

const CATEGORY_ORDER: ProjectCategory[] = ['full-stack', 'frontend', 'backend']

/**
 * Art-directed sequence for the eleven showcase projects. Layouts are keyed to
 * the canonical project index, so filtering never reshuffles the composition.
 */
const SHOWCASE_LAYOUTS: ProjectLayout[] = [
  'feature',
  'media-right',
  'media-left',
  'banner',
  'media-right',
  'media-left',
  'media-right',
  'media-left',
  'banner',
  'media-right',
  'media-left',
]

const COPY = {
  otherCount: { en: 'builds in the archive', ar: 'عملاً في الأرشيف' },
  live: { en: 'Live', ar: 'مباشر' },
  source: { en: 'Source', ar: 'الكود' },
}

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
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <p className="label-mono tabular-nums">
          {String(visibleProjects.length).padStart(2, '0')} /{' '}
          {String(showcaseProjects.length).padStart(2, '0')}
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <ol aria-label={localize({ en: 'Selected work', ar: 'أعمال مختارة' }, language)}>
          {visibleProjects.map((project, position) => {
            const index = stableProjectIndex(project.slug)
            const layout = SHOWCASE_LAYOUTS[(index - 1) % SHOWCASE_LAYOUTS.length]
            const isFirst = position === 0 && !activeCategory

            return (
              <li
                key={project.slug}
                className={
                  isFirst
                    ? 'border-t border-line pt-8'
                    : 'mt-16 border-t border-line pt-10 sm:mt-24'
                }
              >
                <Reveal delay={Math.min(position, 3) * 60}>
                  <ProjectCard project={project} index={index} layout={layout} />
                </Reveal>
              </li>
            )
          })}
        </ol>
      ) : (
        <p role="status" className="text-sm text-muted-foreground">
          {localize(EMPTY_CATEGORY_TEXT, language)}
        </p>
      )}

      {otherProjects.length > 0 ? (
        <section aria-labelledby="other-projects-heading" className="mt-6 border-t border-line pt-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p className="label-mono text-accent">Archive</p>
              <h3 id="other-projects-heading" className="display-lg mt-3">
                {localize(OTHER_PROJECTS_TITLE, language)}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {localize(OTHER_PROJECTS_TEXT, language)}
              </p>
            </div>
            <p className="label-mono lg:col-span-4 lg:text-end">
              {String(otherProjects.length).padStart(2, '0')} {localize(COPY.otherCount, language)}
            </p>
          </div>

          <ul className="mt-10">
            {otherProjects.map((project) => {
              const index = stableProjectIndex(project.slug)
              const title = localize(project.title, language)
              const directLinks = project.links.slice(0, 2)

              return (
                <li key={project.slug} className="border-t border-line last:border-b">
                  <div className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-4 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(7rem,14rem)_auto] sm:gap-4 sm:py-5">
                    <span className="label-mono tabular-nums">
                      {String(index).padStart(2, '0')}
                    </span>

                    <Link to={`/projects/${project.slug}`} className="group min-w-0">
                      <span className="display-sm link-underline block transition-colors group-hover:text-accent">
                        {title}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {localize(project.summary, language)}
                      </span>
                    </Link>

                    <span className="label-mono hidden truncate normal-case tracking-normal sm:block">
                      {project.stack?.join(' · ')}
                    </span>

                    <div className="flex items-center gap-1">
                      {directLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          aria-label={`${localize(link.label ?? LINK_TYPE_LABELS[link.type], language)}: ${title}`}
                          className="hidden min-h-11 items-center gap-1.5 px-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
                        >
                          {link.type === 'live-demo' ? localize(COPY.live, language) : localize(COPY.source, language)}
                          <ArrowUpRight className="size-3 rtl:-scale-x-100" aria-hidden="true" />
                        </a>
                      ))}
                      <Link
                        to={`/projects/${project.slug}`}
                        aria-label={`${title} — ${localize(VIEW_DETAILS_LABEL, language)}`}
                        className="inline-flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-accent"
                      >
                        <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
