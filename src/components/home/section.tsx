import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Full-width home section wrapper bordered like a film slide, with a stable anchor id.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-[66px] border-b border-border py-10 sm:py-12 lg:py-14', className)}
    >
      {children}
    </section>
  )
}

interface SectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  id?: string
}

/**
 * Section header: small red-dashed eyebrow, tight bold heading, and an
 * optional trailing CTA aligned to the baseline, like the reference layout.
 */
export function SectionIntro({ eyebrow, title, description, action, className, id }: SectionIntroProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-8 gap-y-4', className)}>
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 id={id} className="heading-section max-w-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
