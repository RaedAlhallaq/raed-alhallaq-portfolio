import { FolderGit2, Globe } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'
import { LINK_TYPE_LABELS } from './project-labels'

interface ProjectLinksProps {
  project: Project
  size?: 'default' | 'lg'
}

export function ProjectLinks({ project, size = 'default' }: ProjectLinksProps) {
  const { language } = useLanguage()

  if (project.links.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', size === 'lg' && 'gap-2.5')}>
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
                'inline-flex items-center gap-1.5 font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
                size === 'lg'
                  ? 'rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:border-border-strong hover:bg-muted'
                  : 'rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {isDemo ? (
                <Globe className={cn('shrink-0', size === 'lg' ? 'size-4' : 'size-3.5')} aria-hidden="true" />
              ) : (
                <FolderGit2 className={cn('shrink-0', size === 'lg' ? 'size-4' : 'size-3.5')} aria-hidden="true" />
              )}
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
