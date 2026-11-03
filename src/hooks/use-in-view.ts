import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * One-shot reveal-on-scroll state using a native IntersectionObserver.
 * No scroll listeners, no animation loop, disconnects after first reveal.
 *
 * Content is visible immediately (state initialized visible) when the user
 * prefers reduced motion or IntersectionObserver is unavailable, so content
 * never depends on animation completing.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
): { ref: React.RefObject<T | null>; inView: boolean } {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef<T | null>(null)

  // Capability check evaluated once at first render (browser-only; the app has
  // no server rendering, and a guard is kept for safety).
  const [capability] = useState(() => {
    if (typeof window === 'undefined') {
      return { reducedMotion: false, supportsIO: false }
    }
    return {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      supportsIO: typeof IntersectionObserver !== 'undefined',
    }
  })

  const forceVisible = capability.reducedMotion || !capability.supportsIO
  const [inView, setInView] = useState(forceVisible)

  useEffect(() => {
    if (forceVisible) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [forceVisible, threshold, rootMargin])

  return { ref, inView }
}