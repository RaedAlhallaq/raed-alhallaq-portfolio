import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { localize } from '@/lib/localize'
import { projects, siteContext } from '@/data'
import type { Project } from '@/types'
import { ProjectVisual } from '@/components/projects/project-visual'
import { ProjectLinks } from '@/components/projects/project-links'
import { stableProjectIndex } from '@/components/projects/project-index'
import { Reveal } from '@/components/shared/reveal'
import {
  BACK_TO_PROJECTS_LABEL,
  CATEGORY_LABELS,
  DATE_LABEL,
  LINK_TYPE_LABELS,
  NOTE_LABEL,
  PROJECT_INFORMATION_LABEL,
  PROJECT_NOT_FOUND_TEXT,
  PROJECT_NOT_FOUND_TITLE,
  ownershipEvidenceLabel,
} from '@/components/projects/project-labels'

const COPY = {
  overview: { en: 'Overview', ar: 'نظرة عامة' },
  moreProjects: { en: 'More projects', ar: 'مشاريع أخرى' },
  project: { en: 'Project', ar: 'مشروع' },
  category: { en: 'Category', ar: 'الفئة' },
  ownership: { en: 'Ownership', ar: 'الملكية' },
  role: { en: 'Role', ar: 'الدور' },
}

function BackLink({ label }: { label: string }) {
  return (
    <Link
      to="/#projects"
      className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <ArrowLeft className="size-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
      {label}
    </Link>
  )
}

function ProjectNotFound() {
  const { language } = useLanguage()

  useDocumentMeta({
    title: language === 'en' ? 'Project not found' : 'المشروع غير موجود',
  })

  return (
    <section className="container-page flex-1 py-20 sm:py-28">
      <p className="eyebrow">404</p>
      <h1 className="heading-section mt-4">{localize(PROJECT_NOT_FOUND_TITLE, language)}</h1>
      <p className="mt-3 text-muted-foreground">{localize(PROJECT_NOT_FOUND_TEXT, language)}</p>
      <div className="mt-8">
        <BackLink label={localize(BACK_TO_PROJECTS_LABEL, language)} />
      </div>
    </section>
  )
}

function MoreProjects({ current }: { current: Project }) {
  const { language } = useLanguage()
  const currentPosition = projects.findIndex((project) => project.slug === current.slug)
  const nextProjects = [
    ...projects.slice(currentPosition + 1),
    ...projects.slice(0, currentPosition),
  ].slice(0, 3)

  if (nextProjects.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="eyebrow">{localize(COPY.moreProjects, language)}</h2>
      <ul className="mt-4">
        {nextProjects.map((project) => (
          <li key={project.slug} className="border-t border-border last:border-b">
            <Link
              to={`/projects/${project.slug}`}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4 outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="font-mono text-[0.625rem] text-muted-foreground">
                {String(stableProjectIndex(project.slug)).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block text-base font-medium tracking-tight transition-colors group-hover:underline group-hover:underline-offset-4">
                  {localize(project.title, language)}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {localize(project.summary, language)}
                </span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground rtl:rotate-180 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectDetailView({ project }: { project: Project }) {
  const { language } = useLanguage()

  const title = localize(project.title, language)
  const index = stableProjectIndex(project.slug)
  const categoryLabel = project.category ? localize(CATEGORY_LABELS[project.category], language) : null
  const ownershipLabel = ownershipEvidenceLabel(project, language)
  const hasDemo = project.links.some((link) => link.type === 'live-demo')

  useDocumentMeta({
    title: `${title} — ${localize({ en: 'Projects', ar: 'المشاريع' }, language)}`,
    description: localize(project.summary, language),
    ogUrl: siteContext.baseUrl ? `${siteContext.baseUrl}projects/${project.slug}` : null,
  })

  const factRows: Array<{ dt: string; dd: string }> = []
  if (categoryLabel) factRows.push({ dt: localize(COPY.category, language), dd: categoryLabel })
  factRows.push({ dt: localize(COPY.ownership, language), dd: ownershipLabel })
  if (project.ownership.kind === 'team' && project.ownership.role) {
    factRows.push({ dt: localize(COPY.role, language), dd: localize(project.ownership.role, language) })
  }
  if (project.ownership.kind === 'team' && project.ownership.note) {
    factRows.push({ dt: localize(NOTE_LABEL, language), dd: localize(project.ownership.note, language) })
  }
  if (project.date.display) {
    factRows.push({ dt: localize(DATE_LABEL, language), dd: localize(project.date.display, language) })
  }

  return (
    <article className="container-page flex-1 py-10 sm:py-14">
      <BackLink label={localize(BACK_TO_PROJECTS_LABEL, language)} />

      <Reveal>
        <div className="mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{categoryLabel ?? localize(COPY.project, language)}</span>
            <span aria-hidden="true">·</span>
            <span>{ownershipLabel}</span>
            {hasDemo ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{localize(LINK_TYPE_LABELS['live-demo'], language)}</span>
              </>
            ) : null}
          </div>

          <h1 className="detail-title mt-4">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {localize(project.summary, language)}
          </p>

          {project.stack && project.stack.length > 0 ? (
            <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground rtl:tracking-normal">
              {project.stack.join(' · ')}
            </p>
          ) : null}

          <div className="mt-7">
            <ProjectLinks project={project} size="lg" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <ProjectVisual
          project={project}
          index={index}
          className="mt-10 aspect-[16/10] w-full sm:aspect-[21/9]"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <h2 className="eyebrow">{localize(COPY.overview, language)}</h2>
          <div className="mt-4 max-w-[65ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            {project.details ? (
              localize(project.details, language)
                .split('\n')
                .filter((line) => line.trim().length > 0)
                .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p>{localize(project.summary, language)}</p>
            )}

            {project.note ? (
              <p className="border-s border-border-strong ps-4 text-sm text-muted-foreground">
                {localize(project.note, language)}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-4">
          <h2 className="eyebrow">{localize(PROJECT_INFORMATION_LABEL, language)}</h2>
          <dl className="mt-4">
            {factRows.map((row) => (
              <div key={row.dt} className="grid gap-1 border-t border-border py-3">
                <dt className="text-xs text-muted-foreground">{row.dt}</dt>
                <dd className="text-sm font-medium text-foreground">{row.dd}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <MoreProjects current={project} />
    </article>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const project = slug ? projects.find((entry) => entry.slug === slug) : undefined

  if (!project) {
    return <ProjectNotFound />
  }

  return <ProjectDetailView project={project} />
}
