import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { projects, socials } from '@/data'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '01 — Selected work', ar: '01 — أعمال مختارة' },
  title: { en: 'Selected work, built to ship.', ar: 'أعمال مختارة، بُنيت لتُطلق.' },
  description: {
    en: 'Product work, reusable components, and full-stack builds. Templates and practice pieces are archived below.',
    ar: 'أعمال منتجات ومكوّنات قابلة لإعادة الاستخدام ومشاريع متكاملة. القوالب والأعمال التطبيقية مؤرشفة أدناه.',
  },
  meta: { en: 'Product & interface work', ar: 'أعمال منتجات وواجهات' },
  github: { en: 'All repositories', ar: 'كل المستودعات' },
}

export function ProjectsPreview() {
  const { language } = useLanguage()
  const github = socials.find((social) => social.platform === 'github')
  const count = projects.filter((project) => !project.secondary).length

  return (
    <Section id="projects">
      <div className="container-page">
        <Reveal>
          <SectionIntro
            id="projects-heading"
            eyebrow={localize(COPY.eyebrow, language)}
            title={localize(COPY.title, language)}
            description={localize(COPY.description, language)}
            meta={`${String(count).padStart(2, '0')} — ${localize(COPY.meta, language)}`}
          />
        </Reveal>

        <div className="mt-8 flex justify-end">
          {github ? (
            <Reveal delay={80}>
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="link-underline inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {localize(COPY.github, language)}
                <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-10">
          <ProjectsGrid />
        </div>
      </div>
    </Section>
  )
}
