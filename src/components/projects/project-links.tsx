import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/shared/brand-icons'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { LINK_TYPE_LABELS } from './project-labels'

interface ProjectLinksProps {
  project: Project
  size?: 'default' | 'lg'
}

/** Real, always-visible project links with an explicit external marker. */
export function ProjectLinks({ project, size = 'default' }: ProjectLinksProps) {
  const { language } = useLanguage()

  if (project.links.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', size === 'lg' && 'gap-2.5')}>
      {project.links.map((link) => {
        const isDemo = link.type === 'live-demo'
        const label = localize(link.label ?? LINK_TYPE_LABELS[link.type], language)

        return (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`${label}: ${localize(project.title, language)}`}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 border border-line px-3.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent',
                size === 'lg' && 'min-h-12 px-5 text-[0.7rem]',
              )}
            >
              {isDemo ? (
                <ArrowUpRight
                  className={cn('shrink-0 rtl:-scale-x-100', size === 'lg' ? 'size-4' : 'size-3.5')}
                  aria-hidden="true"
                />
              ) : (
                <GithubIcon
                  className={cn('shrink-0', size === 'lg' ? 'size-4' : 'size-3.5')}
                  aria-hidden="true"
                />
              )}
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
