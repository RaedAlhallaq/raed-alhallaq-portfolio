import { createElement } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/use-in-view'

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'ul' | 'span'

interface RevealProps {
  /** Rendered element. Defaults to a div. */
  as?: RevealTag
  className?: string
  /** Optional stagger delay in ms, applied only once the element is visible. */
  delay?: number
  id?: string
  children: ReactNode
}

/**
 * Subtle reveal-on-scroll wrapper: fade + small vertical translation via
 * transform/opacity only. Fires once. Transition delays are neutralized under
 * `prefers-reduced-motion` and the wrapper keeps content visible when reduced
 * motion is requested or IntersectionObserver is unavailable.
 */
export function Reveal({ as = 'div', className, delay = 0, id, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  return createElement(
    as,
    {
      ref,
      id,
      className: cn(
        'transition-[transform,opacity] duration-500 ease-out',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      ),
      style: delay > 0 && inView ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  )
}