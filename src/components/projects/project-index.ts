import { projects } from '@/data'

/**
 * Stable 1-based project index in canonical data order.
 * Shared by the projects grid and the detail page so both stay in sync.
 */
export function stableProjectIndex(slug: string): number {
  const found = projects.findIndex((project) => project.slug === slug)
  return found >= 0 ? found + 1 : 0
}
