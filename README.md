# Raed Alhallaq — Portfolio

A bilingual, accessible portfolio for **Raed Alhallaq**, a front-end developer based in Gaza, Palestine. Built as a single-page application with React, TypeScript, Vite, and Tailwind CSS.

The site presents verified work and background only: projects, roles, education, training, and certificates are sourced from Raed's GitHub, LinkedIn, and programme records. Screenshots and claims that are not verified are omitted rather than invented.

## Highlights

- **Bilingual AR/EN** — full Arabic and English content with persisted language choice
- **RTL/LTR** — direction, layout, and icon orientation switch with the language
- **Dark/light theme** — persisted preference with no flash on first paint
- **Editorial layout** — a typographic, whitespace-led design with a serif display face and quiet ink palette
- **15 project pages** — routed detail pages for product, platform, component, and template work
- **Category filtering** — filter the main gallery by full-stack, frontend, or backend work
- **Other projects** — practice builds and challenge templates grouped below the main gallery instead of mixed into it
- **Accessibility** — semantic landmarks, skip link, visible focus states, keyboard-friendly controls, and reduced-motion support
- **SEO** — per-page metadata, canonical URL, Open Graph tags, sitemap, and robots file
- **Responsive** — tested from 390 px mobile through wide desktop

## Technology

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui and Base UI primitives
- React Router (`/`, `/projects/:slug`)
- lucide-react plus local brand SVGs
- oxlint

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. Production build and checks:

```bash
npm run build      # type-check + production build
npm run preview    # serve the build locally
npm run lint       # oxlint
```

## Project structure

```text
src/
├── app/           # router
├── components/    # home sections, project components, shell, UI primitives
├── data/          # verified content (profile, projects, journey, skills, certificates, socials)
├── hooks/         # document metadata
├── lib/           # localization and utility helpers
├── providers/     # theme and language providers
├── routes/        # page-level components
└── types/         # shared TypeScript models
```

Content lives in `src/data/`. To add a project, add an entry to `src/data/projects.ts` and its URL to `public/sitemap.xml`. The detail route and filters pick it up automatically.

## Deployment

The app is a static SPA. `vercel.json` rewrites every path to `/` so client-side routes resolve on Vercel.

```bash
npm run build
```

Deploy the `dist/` output, or connect the repository to Vercel with the default Vite preset.
