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
  home: { en: 'Back to home', ar: 'العودة إلى الرئيسية' },
  projects: { en: 'View projects', ar: 'عرض المشاريع' },
}

export function NotFoundPage() {
  const { language } = useLanguage()

  useDocumentMeta({
    title: COPY.title[language],
  })

  return (
    <section className="container-page flex-1 py-16 sm:py-24">
      <div className="tile mx-auto max-w-2xl p-8 sm:p-10">
        <p className="tech-label">404</p>
        <h1 className="heading-section mt-4">{COPY.title[language]}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{COPY.text[language]}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to="/#home"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background outline-none transition-opacity hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
            {COPY.home[language]}
          </Link>
          <Link
            to="/#projects"
            className="rounded-md text-sm font-medium text-muted-foreground underline underline-offset-4 outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {COPY.projects[language]}
          </Link>
        </div>
      </div>
    </section>
  )
}
