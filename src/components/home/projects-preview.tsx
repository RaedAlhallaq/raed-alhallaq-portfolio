import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { localize } from '@/lib/localize'
import { socials } from '@/data'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { Section, SectionIntro } from './section'
import { Reveal } from '@/components/shared/reveal'

const COPY = {
  eyebrow: { en: '04 — Selected work', ar: '04 — أعمال مختارة' },
  title: { en: 'Projects built to be used.', ar: 'مشاريع بُنيت لتُستخدم.' },
  description: {
    en: 'Product work, reusable components, and full-stack builds. Templates and practice pieces are grouped below.',
    ar: 'أعمال منتجات ومكوّنات قابلة لإعادة الاستخدام ومشاريع متكاملة. القوالب والأعمال التطبيقية مجمّعة أدناه.',
  },
  github: { en: 'All repositories', ar: 'كل المستودعات' },
}

export function ProjectsPreview() {
  const { language } = useLanguage()
  const github = socials.find((social) => social.platform === 'github')

  return (
    <Section id="projects">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionIntro
              id="projects-heading"
              eyebrow={localize(COPY.eyebrow, language)}
              title={localize(COPY.title, language)}
              description={localize(COPY.description, language)}
            />
          </Reveal>

          {github ? (
            <Reveal delay={80}>
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="link inline-flex items-center gap-1.5 text-sm"
              >
                {localize(COPY.github, language)}
                <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12">
          <ProjectsGrid />
        </div>
      </div>
    </Section>
  )
}
