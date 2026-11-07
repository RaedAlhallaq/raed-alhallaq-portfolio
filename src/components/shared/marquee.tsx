import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
}

/**
 * Decorative hairline marquee. The content is repeated for the loop, so the
 * whole strip is hidden from assistive tech — every item is presented again in
 * the skills section. Motion stops for reduced-motion users (see index.css).
 */
export function Marquee({ items, className }: MarqueeProps) {
  const copy = (duplicate: boolean) => (
    <ul
      data-marquee-copy={duplicate ? 'duplicate' : 'original'}
      aria-hidden="true"
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex shrink-0 items-center gap-5 pe-5">
          <span className="label-mono whitespace-nowrap text-muted-foreground">{item}</span>
          <span aria-hidden="true" className="size-1 bg-accent" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={cn('marquee border-y border-line bg-background py-4', className)}
      dir="ltr"
    >
      <div className="marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}
