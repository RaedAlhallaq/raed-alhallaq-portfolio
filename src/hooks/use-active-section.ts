import { useEffect, useState } from 'react'

/**
 * Lightweight active-section tracking built on a single IntersectionObserver.
 * Observes the section elements at a band across the viewport; the section
 * crossing that band becomes active. Returns null until a section is reached,
 * letting the caller default to the top-most item. No scroll listeners.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}