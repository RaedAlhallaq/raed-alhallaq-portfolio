import { useLanguage } from '@/providers/language'
import { useDocumentMeta } from '@/hooks/use-document-meta'
import { siteContext } from '@/data'
import { About } from '@/components/home/about'
import { Contact } from '@/components/home/contact'
import { Hero } from '@/components/home/hero'
import { Journey } from '@/components/home/journey'
import { ProjectsPreview } from '@/components/home/projects-preview'
import { Skills } from '@/components/home/skills'

const TITLE = {
  en: 'Raed Alhallaq — Frontend Developer',
  ar: 'رائد الحلاق — مطوّر واجهات أمامية',
}

const DESCRIPTION = {
  en: 'Front-end developer in Gaza building clean, responsive interfaces with React, TypeScript, and Tailwind CSS. Co-Founder at Hireland.',
  ar: 'مطوّر واجهات أمامية من غزة يبني واجهات نظيفة ومتجاوبة باستخدام React و TypeScript و Tailwind CSS. شريك مؤسس في Hireland.',
}

export function HomePage() {
  const { language } = useLanguage()

  useDocumentMeta({
    title: TITLE[language],
    description: DESCRIPTION[language],
    ogUrl: siteContext.baseUrl,
  })

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Journey />
      <ProjectsPreview />
      <Contact />
    </>
  )
}
