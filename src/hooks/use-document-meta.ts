import { useEffect } from 'react'

interface DocumentMeta {
  title: string
  description?: string
  ogUrl?: string | null
}

function upsertMeta(selector: string, attributes: Record<string, string>, content: string | null) {
  const existing = document.querySelector<HTMLMetaElement>(selector)
  if (content === null) {
    existing?.remove()
    return
  }
  if (existing) {
    existing.setAttribute('content', content)
    return
  }
  const meta = document.createElement('meta')
  for (const [key, value] of Object.entries(attributes)) {
    meta.setAttribute(key, value)
  }
  meta.setAttribute('content', content)
  document.head.appendChild(meta)
}

export function useDocumentMeta({ title, description, ogUrl }: DocumentMeta) {
  useEffect(() => {
    document.title = title

    upsertMeta('meta[name="description"]', { name: 'description' }, description ?? null)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description ?? null)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, ogUrl ?? null)
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description ?? null)
  }, [title, description, ogUrl])
}