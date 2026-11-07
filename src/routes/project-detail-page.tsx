import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
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
  caseLabel: { en: 'Case', ar: 'حالة' },
}

function BackLink({ label }: { label: string }) {
  return (
    <Link
      to="/#projects"
      className="group inline-flex min-h-11 items-center gap-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent"
    >
      <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" aria-hidden="true" />
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
    <section className="container-page flex-1 pb-24 pt-[7.5rem] sm:pt-[9rem]">
      <p className="label-mono text-accent">404</p>
      <h1 className="display-xl mt-6 max-w-3xl">{localize(PROJECT_NOT_FOUND_TITLE, language)}</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        {localize(PROJECT_NOT_FOUND_TEXT, language)}
      </p>
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
    <div className="mt-20 border-t border-line pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="display-lg">{localize(COPY.moreProjects, language)}</h2>
        <span className="label-mono">{String(nextProjects.length).padStart(2, '0')}</span>
      </div>

      <ul className="mt-8">
        {nextProjects.map((project) => (
          <li key={project.slug} className="border-t border-line last:border-b">
            <Link
              to={`/projects/${project.slug}`}
              className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_12rem_auto] sm:gap-4"
            >
              <span className="label-mono tabular-nums">
                {String(stableProjectIndex(project.slug)).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="display-sm link-underline block transition-colors group-hover:text-accent">
                  {localize(project.title, language)}
                </span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {localize(project.summary, language)}
                </span>
              </span>
              <span className="label-mono hidden truncate normal-case tracking-normal sm:block">
                {project.stack?.join(' · ')}
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100"
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
    <article className="flex-1 pb-20 pt-[6.75rem] sm:pb-24 sm:pt-[8rem]">
      <div className="container-page">
        <BackLink label={localize(BACK_TO_PROJECTS_LABEL, language)} />

        <Reveal>
          <header className="mt-8 border-t border-line pt-6">
            <div className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">
                {localize(COPY.caseLabel, language)} {String(index).padStart(2, '0')}
              </span>
              <span aria-hidden="true">/</span>
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

            <h1 className="display-xl mt-5 max-w-5xl">{title}</h1>

            <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-10">
              <p className="text-lead max-w-2xl text-muted-foreground lg:col-span-8">
                {localize(project.summary, language)}
              </p>
              {project.stack && project.stack.length > 0 ? (
                <p className="label-mono normal-case leading-relaxed tracking-normal lg:col-span-4 lg:text-end">
                  {project.stack.join(' · ')}
                </p>
              ) : null}
            </div>

            <div className="mt-8">
              <ProjectLinks project={project} size="lg" />
            </div>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <ProjectVisual
            project={project}
            index={index}
            className="mt-12 aspect-[16/10] w-full sm:aspect-[2/1]"
          />
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <h2 className="label-mono">{localize(COPY.overview, language)}</h2>
            <div className="prose-editorial mt-5 max-w-[65ch] text-base leading-[1.8] text-muted-foreground sm:text-lg">
              {project.details ? (
                localize(project.details, language)
                  .split('\n')
                  .filter((line) => line.trim().length > 0)
                  .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              ) : (
                <p>{localize(project.summary, language)}</p>
              )}

              {project.note ? (
                <p className="mt-6 border-s-2 border-accent ps-4 text-sm text-muted-foreground">
                  {localize(project.note, language)}
                </p>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-4">
            <div className="border border-line bg-surface p-6 lg:sticky lg:top-24">
              <h2 className="label-mono">{localize(PROJECT_INFORMATION_LABEL, language)}</h2>
              <dl className="mt-4">
                {factRows.map((row) => (
                  <div key={row.dt} className="grid gap-1 border-t border-line py-3">
                    <dt className="label-mono">{row.dt}</dt>
                    <dd className="text-sm font-medium leading-relaxed text-foreground">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <MoreProjects current={project} />
      </div>
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
