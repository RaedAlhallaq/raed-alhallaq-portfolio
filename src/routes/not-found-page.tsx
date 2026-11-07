import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { contact } from '@/data'

const COPY = {
  label: { en: 'Error — 404', ar: 'خطأ — 404' },
  title: { en: 'This page went missing.', ar: 'هذه الصفحة غير موجودة.' },
  text: {
    en: 'The address may have changed, or the page never existed. The work is still one click away.',
    ar: 'قد يكون العنوان قد تغيّر، أو أن الصفحة لم تكن موجودة أصلاً. الأعمال لا تزال على بُعد نقرة.',
  },
  home: { en: 'Back home', ar: 'العودة للرئيسية' },
  projects: { en: 'Browse selected work', ar: 'تصفّح الأعمال المختارة' },
  hint: { en: 'Or write directly —', ar: 'أو راسلني مباشرة —' },
}

export function NotFoundPage() {
  const { language } = useLanguage()

  useDocumentMeta({ title: COPY.title[language] })

  return (
    <section className="container-page flex-1 pb-24 pt-[7.5rem] sm:pb-32 sm:pt-[9rem]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
        <p className="label-mono inline-flex items-center gap-3">
          <span aria-hidden="true" className="size-1 bg-accent" />
          {COPY.label[language]}
        </p>
        <p className="label-mono">Raed Alhallaq</p>
      </div>

      <p className="display-hero display-outline mt-8 select-none" aria-hidden="true">
        404
      </p>

      <h1 className="display-xl mt-6 max-w-3xl">{COPY.title[language]}</h1>
      <p className="text-lead mt-5 max-w-xl text-muted-foreground">{COPY.text[language]}</p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link to="/#home" className="btn btn-primary">
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {COPY.home[language]}
        </Link>
        <Link to="/#projects" className="btn btn-outline">
          {COPY.projects[language]}
          <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-5 text-sm text-muted-foreground">
        {COPY.hint[language]}
        <a
          href={`mailto:${contact.email}`}
          className="link-underline font-medium text-foreground hover:text-accent"
        >
          {contact.email}
        </a>
      </p>
    </section>
  )
}
