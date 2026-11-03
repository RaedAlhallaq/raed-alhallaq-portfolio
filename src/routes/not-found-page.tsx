import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { useDocumentMeta } from '@/hooks/use-document-meta'

const COPY = {
  title: { en: 'Page not found', ar: 'الصفحة غير موجودة' },
  text: {
    en: 'The page you are looking for does not exist or has moved.',
    ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
  },
  home: { en: 'Back home', ar: 'العودة للرئيسية' },
  projects: { en: 'Browse projects', ar: 'تصفّح المشاريع' },
}

export function NotFoundPage() {
  const { language } = useLanguage()

  useDocumentMeta({ title: COPY.title[language] })

  return (
    <section className="container-page flex-1 py-24 sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="heading-section mt-4">{COPY.title[language]}</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">{COPY.text[language]}</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link
          to="/#home"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {COPY.home[language]}
        </Link>
        <Link
          to="/#projects"
          className="link text-sm"
        >
          {COPY.projects[language]}
        </Link>
      </div>
    </section>
  )
}
