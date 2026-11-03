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
  en: 'Raed Alhallaq — Front-End Developer (React & TypeScript)',
  ar: 'رائد الحلاق — مطوّر واجهات أمامية (React وTypeScript)',
}

const DESCRIPTION = {
  en: 'Co-Founder at Khibra Center for Training & Development and Hireland, and front-end developer (React & TypeScript) building clean, responsive interfaces in Gaza.',
  ar: 'شريك مؤسس في مركز خبرة للتدريب والتطوير وفي Hireland، ومطوّر واجهات أمامية (React وTypeScript) يبني واجهات نظيفة ومتجاوبة من غزة.',
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
