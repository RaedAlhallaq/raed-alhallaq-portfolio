import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Full-width home section wrapper with a stable anchor id.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 border-t border-border/60 py-20 sm:py-24 lg:py-28', className)}
    >
      {children}
    </section>
  )
}

interface SectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  id?: string
}

/**
 * Section introduction: eyebrow, heading, and optional supporting copy.
 * The parent controls the container width.
 */
export function SectionIntro({ eyebrow, title, description, className, id }: SectionIntroProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="heading-section mt-4">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
