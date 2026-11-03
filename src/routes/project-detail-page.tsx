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
      className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
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
      <p className="tech-label">404</p>
      <h1 className="heading-section mt-4">{localize(PROJECT_NOT_FOUND_TITLE, language)}</h1>
      <p className="mt-3 text-muted-foreground">{localize(PROJECT_NOT_FOUND_TEXT, language)}</p>
      <div className="mt-7">
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
    <div className="mt-10 border-t border-border/70 pt-8">
      <h2 className="text-lg font-semibold tracking-tight">{localize(COPY.moreProjects, language)}</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {nextProjects.map((project) => (
          <li key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              className="tile-interactive group flex h-full flex-col p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="tech-label text-[0.625rem]">
                {String(stableProjectIndex(project.slug)).padStart(2, '0')}
              </span>
              <span className="mt-2 text-base font-semibold tracking-tight transition-colors group-hover:text-brand">
                {localize(project.title, language)}
              </span>
              <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {localize(project.summary, language)}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-foreground">
                {language === 'en' ? 'View project' : 'عرض المشروع'}
                <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
              </span>
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
    <article className="container-page flex-1 py-8 sm:py-10">
      <BackLink label={localize(BACK_TO_PROJECTS_LABEL, language)} />

      <Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="tile flex flex-col p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-background text-foreground">
                {categoryLabel ?? localize(COPY.project, language)}
              </span>
              <span className="chip bg-background">{ownershipLabel}</span>
              {hasDemo ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                  {localize(LINK_TYPE_LABELS['live-demo'], language)}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {localize(project.summary, language)}
            </p>

            {project.stack && project.stack.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-auto pt-7">
              <ProjectLinks project={project} size="lg" />
            </div>
          </div>

          <ProjectVisual
            project={project}
            index={index}
            className="min-h-[16rem] rounded-[1.5rem] border border-border/80 shadow-soft lg:col-span-5"
          />
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <Reveal className="tile p-6 sm:p-8 lg:col-span-8">
          <h2 className="text-lg font-semibold tracking-tight">{localize(COPY.overview, language)}</h2>
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
              <p className="rounded-xl border border-border/70 bg-muted/50 px-3.5 py-2.5 text-sm text-muted-foreground">
                {localize(project.note, language)}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={80} className="tile p-5 sm:p-6 lg:col-span-4">
          <h2 className="eyebrow">{localize(PROJECT_INFORMATION_LABEL, language)}</h2>
          <dl className="mt-4 divide-y divide-border/70">
            {factRows.map((row) => (
              <div key={row.dt} className="grid gap-1 py-3 first:pt-0 last:pb-0">
                <dt className="text-[0.625rem] font-medium uppercase tracking-[0.16em] text-muted-foreground [dir='rtl']:tracking-normal">
                  {row.dt}
                </dt>
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
