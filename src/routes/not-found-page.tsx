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
  index: { en: '404', ar: '٤٠٤' },
  home: { en: 'Back home', ar: 'العودة للرئيسية' },
  projects: { en: 'Browse projects', ar: 'تصفّح المشاريع' },
}

export function NotFoundPage() {
  const { language } = useLanguage()

  useDocumentMeta({ title: COPY.title[language] })

  return (
    <section className="container-page flex flex-1 flex-col justify-center py-20 sm:py-28">
      <p aria-hidden="true" className="num-display display-hero select-none opacity-90">
        {COPY.index[language]}
      </p>
      <h1 className="heading-section mt-6">{COPY.title[language]}</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
        {COPY.text[language]}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          to="/#home"
          className="inline-flex min-h-12 items-center gap-5 bg-brand px-5 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          {COPY.home[language]}
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
        <Link
          to="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          {COPY.projects[language]}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
