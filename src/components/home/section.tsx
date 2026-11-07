import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

/** Full-width home section with a stable anchor id and generous rhythm. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('section-shell', className)}>
      {children}
    </section>
  )
}

interface SectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  meta?: string
  className?: string
  id?: string
}

/**
 * Editorial section opener: hairline + index on the left, a large display
 * heading spanning the grid, and supporting copy in a narrow companion column.
 */
export function SectionIntro({
  eyebrow,
  title,
  description,
  meta,
  className,
  id,
}: SectionIntroProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
        {eyebrow ? (
          <p className="label-mono inline-flex items-center gap-3">
            <span aria-hidden="true" className="size-1 bg-accent" />
            {eyebrow}
          </p>
        ) : (
          <span />
        )}
        {meta ? <p className="label-mono">{meta}</p> : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id={id} className="display-lg max-w-4xl lg:col-span-8">
          {title}
        </h2>
        {description ? (
          <p className="text-lead max-w-md text-muted-foreground lg:col-span-4">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
