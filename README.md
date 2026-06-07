# Nimo — Portfolio

Personal portfolio of **Nihal Mohan Shettigar** — Python engineer building AI-native platforms, async backends, and Next.js frontends. The site itself is the project: terminal aesthetic, fluorescent yellow-green on near-black, fully typed end-to-end.

Live: [nimo.cv](https://nimo.cv) _(update when wired)_ · Source: [github.com/NihalMohan04/portfolio-nimo](https://github.com/NihalMohan04/portfolio-nimo)

## Tech stack

### Framework & language
- **[Next.js 16](https://nextjs.org/)** — App Router, React Server/Client Components, Turbopack, prerendered static output
- **[React 19](https://react.dev/)** — Server Components, hooks, refs
- **[TypeScript 5](https://www.typescriptlang.org/)** — strict mode throughout

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** — `@import "tailwindcss"`, custom `@theme inline` tokens, no `tailwind.config.js`
- **[shadcn/ui](https://ui.shadcn.com/)** — `base-nova` preset (built on Base UI primitives, not Radix), generated components in `components/ui/`
- Custom CSS layer for: dot-grid background, mask vignette, text/border glow, cursor-blink keyframes, scan + marquee animations

### Animation
- **[Framer Motion 12](https://motion.dev/)** — staggered entrance reveals, `whileInView` scroll triggers, spring-based scroll progress, active-section observer in the nav

### Icons & fonts
- **[Lucide](https://lucide.dev/)** — icon set (no SVGs hand-rolled)
- **Geist Sans** (body) and **JetBrains Mono** (accents / cursor / mono labels) via `next/font/google` — self-hosted, zero CLS

### State / data
- No global state library — content is plain typed data files (`lib/data/*.ts`)
- Server state is prerendered at build time (no TanStack Query on the live site — that's only in the resume/CV, not this portfolio's own runtime)

### Tooling
- **ESLint 9** with `eslint-config-next`
- **shadcn CLI** for adding UI primitives (`npx shadcn@latest add …`)
- No tests yet (the project is a static portfolio; CI is build + typecheck + lint)

## Features

- Sticky nav with `IntersectionObserver`-driven active section + scroll-aware backdrop
- Top scroll-progress bar (spring-animated `scaleX`)
- Hero with typing `whoami` command + blinking cursor
- Vertical experience timeline with pulsing "currently" markers and `[PART-TIME]` / `[FULL-TIME]` work-mode chips
- Grouped skills grid with hover-glow chips
- Terminal-style contact "window" with working copy-to-clipboard email button
- Custom 404 page (`cd ~` to go home)
- `prefers-reduced-motion: reduce` honored globally
- Zero layout shift, zero external font/JS requests (fonts self-hosted, no analytics)

## Project structure

```
site/
├── app/
│   ├── layout.tsx            root layout: nav + footer + scroll-progress wrap every page
│   ├── page.tsx              composes the five sections
│   ├── not-found.tsx         terminal-style 404
│   └── globals.css           palette, grid, keyframes, motion-reduce
├── components/
│   ├── ui/                   shadcn primitives (button, badge, card, separator)
│   ├── sections/             hero, about, experience, skills, contact
│   └── shared/               nav, footer, terminal-cmd, status-badge,
│                             scroll-cue, scroll-progress, stack-marquee,
│                             section-heading, copy-button
├── lib/
│   ├── data/                 profile, experience, skills, site  ← edit content here
│   ├── types.ts              shared types for the data layer
│   └── utils.ts              cn() helper (clsx + tailwind-merge)
├── public/
│   └── resume/               the two resume PDFs
└── …Next.js config (eslint, postcss, tsconfig, etc.)
```

## Quick start

Requires Node 20+ and npm.

```bash
git clone https://github.com/NihalMohan04/portfolio-nimo.git
cd portfolio-nimo/site
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build        # outputs to .next/
npm run start        # serves the production build
```

Lint + typecheck:

```bash
npm run lint
npx tsc --noEmit
```

## Editing content

All copy lives in typed data files under `lib/data/`. You should not need to touch a component to change what the site says.

| File | What it controls |
| --- | --- |
| `lib/data/profile.ts` | name, handle ("Nimo"), role, tagline, location, email, resume URL, status, socials, bio paragraphs, "currently" list, system-info facts |
| `lib/data/experience.ts` | each role: company, title, period, location, `current`, `workMode` (`"full-time"` / `"part-time"`), highlights, stack tags |
| `lib/data/skills.ts` | grouped skill chips (one entry per group) |
| `lib/data/site.ts` | site title, description, nav links |

Adding a new section:

1. Create `components/sections/<name>.tsx` exporting a component
2. Add it to `app/page.tsx`
3. (If it needs a nav link) add an entry to `site.nav` in `lib/data/site.ts` and a matching `id` on the section

## Deployment

The project ships as a fully static build, so any static host works. Vercel is the path of least resistance:

```bash
cd site
npx vercel --prod
```

The repo also deploys cleanly to Netlify, Cloudflare Pages, or any Docker host (`node:20-alpine` + `npm run build` + `npm run start`).

## Accessibility & motion

- All interactive elements are real `<button>` / `<a>` / `<Link>` — no div-buttons.
- `prefers-reduced-motion: reduce` disables `scroll-behavior: smooth` and collapses all keyframe animations to a single frame.
- Focus rings inherit from shadcn's `ring` token (the fluorescent green) for high contrast.

## License

MIT — see [LICENSE](./LICENSE) (or add one if you prefer otherwise).

## Author

**Nihal Mohan Shettigar** — [@NihalMohan04](https://github.com/NihalMohan04) · [LinkedIn](https://linkedin.com/in/nihal-mohan-shettigar) · `nihalmohan46@gmail.com`
