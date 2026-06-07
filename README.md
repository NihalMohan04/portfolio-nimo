# Nimo — Portfolio

Hey, this is the source for my personal site — [nimo.cv](https://nimo.cv) _(update the link when the domain is wired)_. If you're reading this on GitHub, the code is yours to borrow, fork, or learn from. If you're a recruiter who found me through this README, hi, I'm Nihal — scroll up for the actual portfolio 😄.

The site itself is the project: terminal aesthetic, fluorescent yellow-green on near-black, fully typed from data files to components, and built to load instantly with zero layout shift.

> The repo lives at [github.com/NihalMohan04/portfolio-nimo](https://github.com/NihalMohan04/portfolio-nimo). PRs and stars are very welcome, but please don't open issues asking me to add features — this is a personal site.

## What's under the hood

Here's everything that went into building this thing. If you're a fellow dev, this is the part you'll actually care about.

### Framework & language
- **[Next.js 16](https://nextjs.org/)** — App Router, React Server/Client Components, Turbopack for dev. The whole thing prerenders as static HTML at build time, so the deployed site is just files on a CDN.
- **[React 19](https://react.dev/)** — RSC, hooks, refs. Nothing fancy.
- **[TypeScript 5](https://www.typescriptlang.org/)** — strict mode on, no `any` in sight. If you find one, it's a bug.

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** — the new `@import "tailwindcss"` style with custom `@theme inline` tokens. No `tailwind.config.js` because v4 lets you do everything in CSS now.
- **[shadcn/ui](https://ui.shadcn.com/)** — but here's the twist: I used the newer `base-nova` preset which is built on [Base UI](https://base-ui.com/) primitives, not Radix. That's why the Button has a `render` prop instead of the old `asChild` pattern. Worth knowing if you copy-paste from older shadcn tutorials.
- A bunch of custom CSS layered on top: the dot-grid background, the radial mask vignette, text/border glow utilities, cursor-blink keyframes, plus a couple of scan/marquee loops.

### Animation
- **[Framer Motion 12](https://motion.dev/)** — handles the staggered entrance reveals, the `whileInView` scroll triggers, the spring-based scroll progress bar at the top, and the active-section observer in the nav. I didn't reach for GSAP because Framer is enough for everything this site does.

### Icons & fonts
- **[Lucide](https://lucide.dev/)** — every icon you see came from here. No hand-rolled SVGs.
- **Geist Sans** (body) and **JetBrains Mono** (accents, the cursor, mono labels) loaded via `next/font/google` — self-hosted, zero CLS, no Google requests at runtime.

### State / data
- This is the part I'm a little proud of. There is **no global state library**. All content — your name, your bio, every experience entry, every skill chip, every social link — lives in plain typed data files under `lib/data/`. Want to change a paragraph? Edit a `.ts` file. No CMS, no MDX, no YAML, no headless backend.
- (Quick aside: TanStack Query and Zustand show up on my resume for work I do at LatSpace, but they have no business in a portfolio this small. Don't add libraries to look impressive.)

### Tooling
- **ESLint 9** with `eslint-config-next`
- **shadcn CLI** for adding new UI primitives — `npx shadcn@latest add …`
- No tests yet, and I don't feel bad about it. A static portfolio with typecheck + lint is honestly fine. CI is on the roadmap.

## What it actually does

- **Sticky nav** — fades in a blurred backdrop once you scroll, lights up the link for whichever section you're reading. Built with `IntersectionObserver`, no scroll-jacking.
- **Scroll progress bar** — a thin fluorescent line across the very top that fills as you read. Spring-animated so it doesn't feel mechanical.
- **Hero** — a `whoami` command types itself out, then a blinking cursor takes over. The name "Nimo" glows in the primary green.
- **About** — three bio paragraphs plus a "currently" card and a tiny dl-table of system-info facts (based in, editor, shell, coffee/day, etc.).
- **Experience timeline** — vertical rail with gradient, pulsing dots for current roles, `[PART-TIME]` / `[FULL-TIME]` chips for work mode.
- **Skills grid** — eight grouped cards (Languages, Backend, Frontend, AI & Agents, …). Hover a chip and the border shifts to green with a faint glow.
- **Contact** — a fake terminal window with a copy-to-clipboard email button (with a fallback for the `execCommand` crowd), social cards, and a `↓ resume.pdf` button.
- **Custom 404** — `cd ~` to go home, naturally.
- **`prefers-reduced-motion`** — all the keyframe animations and the smooth scroll collapse to nothing if the OS asks for it.

## Project layout

```
site/
├── app/
│   ├── layout.tsx            root layout — nav, footer, scroll-progress wrap every page
│   ├── page.tsx              composes the five sections in order
│   ├── not-found.tsx         terminal-style 404
│   └── globals.css           palette, grid, keyframes, motion-reduce rules
├── components/
│   ├── ui/                   shadcn primitives (button, badge, card, separator)
│   ├── sections/             hero, about, experience, skills, contact
│   └── shared/               nav, footer, terminal-cmd, status-badge,
│                             scroll-cue, scroll-progress, stack-marquee,
│                             section-heading, copy-button
├── lib/
│   ├── data/                 ← edit content here, see the table below
│   ├── types.ts              shared types for the data layer
│   └── utils.ts              cn() helper (clsx + tailwind-merge)
├── public/
│   └── resume/               both resume PDFs
└── …Next.js config (eslint, postcss, tsconfig, next.config.ts)
```

## Getting it running

You'll need Node 20+ and npm (or pnpm/bun, but the lockfile is npm).

```bash
git clone https://github.com/NihalMohan04/portfolio-nimo.git
cd portfolio-nimo/site
npm install
npm run dev          # http://localhost:3000
```

Building for production:

```bash
npm run build        # outputs to .next/
npm run start        # serves the production build
```

Running the linter and typechecker:

```bash
npm run lint
npx tsc --noEmit
```

## Editing your own content

The whole point of the data layer is that you should **never need to touch a component** to change what the site says.

| File | What you'll edit there |
| --- | --- |
| `lib/data/profile.ts` | name, handle ("Nimo"), role, tagline, location, email, resume URL, status badge, socials, bio paragraphs, the "currently" list, and the system-info facts table |
| `lib/data/experience.ts` | each role: company, title, period, location, `current`, `workMode` (`"full-time"` or `"part-time"`), highlight bullets, stack tags |
| `lib/data/skills.ts` | grouped skill chips — one entry per group |
| `lib/data/site.ts` | site title, description, the four nav links |

Adding a brand new section:

1. Drop a new file in `components/sections/<name>.tsx` that exports the section component
2. Add it to the order in `app/page.tsx`
3. If it deserves a nav link, add an entry to `site.nav` in `lib/data/site.ts` and a matching `id="…"` on your section element

That's it. No CMS to maintain, no content file to redeploy separately — just edit the `.ts` file and push.

## Deploying

It builds to fully static output, so you can host this anywhere. The path of least resistance is Vercel (one command, auto-detected as Next.js):

```bash
cd site
npx vercel --prod
```

It also runs happily on Netlify, Cloudflare Pages, or any plain Node host (`node:20-alpine` + `npm run build` + `npm run start`).

## Accessibility & motion

A few small things I cared about:

- All clickable things are real `<button>` / `<a>` / `<Link>` — no divs pretending to be buttons.
- Focus rings inherit from shadcn's `ring` token, which is the fluorescent green. High contrast against the near-black background.
- `prefers-reduced-motion: reduce` is honored globally — animations collapse to a single frame, smooth scroll turns off.
- Selection color is the same primary green at 40% alpha, so highlighting text feels native to the theme.

## License

MIT — do whatever you want with it. Attribution appreciated but not required.

If you do fork it for your own portfolio, the easiest way to make it yours is to:

1. Edit everything in `lib/data/`
2. Drop your own PDFs in `public/resume/`
3. Update the metadata in `lib/data/site.ts` and `app/layout.tsx`
4. Tweak the `oklch(0.92 0.24 128)` green in `app/globals.css` if you want a different accent

That's it. Have fun.

## About me

**Nihal Mohan Shettigar** — Chennai, originally from Mangalore, working part-time as Founding Engineer at LatSpace (Bengaluru-based) and full-time at Cognizant.

- GitHub: [@NihalMohan04](https://github.com/NihalMohan04)
- LinkedIn: [/in/nihal-mohan-shettigar](https://linkedin.com/in/nihal-mohan-shettigar)
- Email: `nihalmohan46@gmail.com`
