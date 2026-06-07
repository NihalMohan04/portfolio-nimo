# Portfolio Build — Progress Tracker

Owner: Nihal "Nimo" Mohan Shettigar
Stack: Next.js 16 (App Router, TS) + Tailwind v4 + shadcn/ui + Framer Motion
Theme: Dark + terminal/code aesthetic, JetBrains Mono, green mono accents
Sections: Hero → About → Experience → Skills → Contact

## Status legend
- [ ] = pending
- [~] = in progress
- [x] = done

## Steps

- [x] **Step 1** — Scaffold Next.js 16 + Tailwind + TS strict; install framer-motion, lucide-react, clsx, tailwind-merge, class-variance-authority
  - Done. Scaffolded at `site/` (Next 16.2.7, React 19.2.4, Tailwind v4, TS 5). Installed: framer-motion, lucide-react, clsx, tailwind-merge, class-variance-authority, tailwindcss-animate, @radix-ui/react-slot. Typecheck and lint pass.
- [x] **Step 2** — Initialize shadcn/ui; add Button, Badge, Card, Separator
  - Done. shadcn `base-nova` preset installed (uses Base UI primitives, not Radix). Added Button, Badge, Card, Separator. Skipped Tooltip for now — can add later if needed. Typecheck and lint pass.
- [x] **Step 3** — Theme tokens + global styles (dark bg, mono palette, grid background, scan-line, cursor blink)
  - Done. Palette flipped to **fluorescent yellow-green + black** per user direction. `--primary: oklch(0.92 0.24 128)` (high-chroma chartreuse-leaning). Background pushed to `oklch(0.1 0 0)` (near-black) for max contrast. Selection color, text-glow, border-glow, chart-1, ring all match the accent.
  - Added data layer: `lib/data/{profile,experience,skills,site}.ts` + `lib/types.ts` (typed, JSON-editable). All content (name, bio, experience array, skills, socials, nav) lives here — no magic strings in components.
  - Folder structure: `components/{ui,sections,shared}`, `lib/{data,types,utils}`, `public/resume/`. Stock Next.js assets removed.
  - Fonts: Geist Sans (body) + JetBrains Mono (mono accents/cursor) via `next/font`.
  - Utilities: `bg-grid` (dotted grid) + `bg-grid-mask` (radial fade vignette) + `text-glow` + `border-glow`. Keyframes: `cursor-blink`, `scan`, `marquee`. `prefers-reduced-motion` respected.
  - `app/page.tsx` placeholder ready. Production build passes; typecheck + lint clean.
- [x] **Step 4** — Hero section (name, title, status badge, terminal-style intro, scroll cue)
  - Done. Built shared atoms first: `components/shared/terminal-command.tsx` (typing animation, blinking cursor), `status-badge.tsx` (pulsing dot), `scroll-cue.tsx` (chevron + label), `stack-marquee.tsx` (infinite scroll with edge fade mask).
  - Composed in `components/sections/hero.tsx`: terminal `whoami` command typing out → name (`Nimo / Nihal Mohan Shettigar`) with `text-glow` on "Nimo" → role/loc line → tagline → status badge + resume/contact buttons → tech-stack marquee → scroll cue.
  - Framer Motion staggered entrance (delays 0 → 1.1s). SSR-safe (typing state starts empty, fills in client-side to avoid hydration mismatch).
  - Buttons: used `buttonVariants` + `<Link>` for the resume link (no `asChild` on shadcn base-nova); used Base UI's `render` prop on the "Get in touch" button. Build, typecheck, lint all pass.
- [x] **Step 5** — About section (bio paragraph + fun facts)
  - Done. Extended `Profile` type + data with `currently: string[]` and `facts: Fact[]` for editable copy.
  - Built shared `components/shared/section-heading.tsx` (`[01] // about ──────── who is this guy`).
  - `components/sections/about.tsx`: 3 bio paragraphs (from `profile.about`) on the left; right column has a "currently" card (▸ list) + a "system info" dl-table of facts. whileInView stagger reveal.
  - Wired into `app/page.tsx` (Hero → About). Lint, typecheck, build all pass.
- [x] **Step 6** — Experience timeline (LatSpace, Cognizant, NIT Karnataka) with motion reveal
  - Done. `components/sections/experience.tsx` with vertical timeline rail (gradient from primary/50 → border → border), pulsing dot markers (ping animation for `current: true` entries), per-card header (role · company), period + location, "currently" inline badge, ▸-style highlight bullets, and uppercase tracking-wider stack tags.
  - whileInView stagger reveal. All copy sourced from `lib/data/experience.ts`. Typecheck, lint, build all pass.
- [x] **Step 7** — Skills / stack grid (grouped chips with hover)
  - Done. `components/sections/skills.tsx` with 2-column responsive grid of Card panels. Each panel: `// category` mono label + item count, then flex-wrapped chips. Chip hover: border + text + bg shift to primary, with a subtle green glow shadow. whileInView stagger. All data from `lib/data/skills.ts`. Typecheck, lint, build all pass.
- [x] **Step 8** — Contact section (email, GitHub, LinkedIn, resume download, copy-email)
  - Done. `components/shared/copy-button.tsx` (clipboard write with `execCommand` fallback, "copied" feedback 1.8s).
  - `components/sections/contact.tsx`: terminal-style "window" with `start_conversation.sh` title bar + live ping dot. Body: `// fastest way` comment + email link (mailto) + copy button, divider, social cards (GitHub, LinkedIn) from `profile.socials`, footer with location/tz + resume download. Trailing credit line. whileInView stagger.
  - Typecheck, lint, build all pass.
- [x] **Step 9** — Wire all sections in `app/page.tsx`; sticky nav; smooth scroll
  - Done. `components/shared/site-nav.tsx`: fixed top header, transparent at top → blurred+solid on scroll (>24px), `backdrop-blur` + 75% bg. Brand mark `~/nimo` (text-glow on "nimo", blinking cursor). Nav links from `site.nav` with active-section detection via IntersectionObserver (rootMargin tuned for sticky-header offset). Active link switches to primary color. Hidden on mobile (sm+), "hire me" CTA always visible.
  - `app/layout.tsx` mounts `<SiteNav />` once at root. `app/globals.css` adds `scroll-behavior: smooth` on html (with `prefers-reduced-motion: reduce` → auto). Typecheck, lint, build all pass.
- [x] **Step 10** — Polish: page-load stagger, scroll-reveal, prefers-reduced-motion respect
  - Done. `components/shared/scroll-progress.tsx` (fluorescent top progress bar via `useScroll` + spring `scaleX`). `components/shared/site-footer.tsx` (year + socials + back-to-top). `app/not-found.tsx` (terminal-style 404 with `cd ~` button). Mounted via root layout (scroll progress + nav + footer wrap every page).
  - Content fix: LatSpace is **part-time**, Cognizant is **full-time** and **concurrent**. Added `workMode?: "full-time" | "part-time"` to the `Experience` type, set on both current entries, rendered as a small uppercase mono chip next to the location. Updated `profile.about` ("working part-time as a Founding Engineer at LatSpace…", "Currently full-time at Cognizant…") and `profile.currently` to match.
  - Typecheck, lint, build all pass.
- [x] **Step 11** — Lint + typecheck + dev-server smoke test
  - Done. Production build prerenders `/` and `/_not-found` as static. Smoke test against user's `localhost:3000`:
    - `/` returns HTTP 200, 88KB, all 5 section IDs present (`#top`, `#about`, `#experience`, `#stack`, `#contact`).
    - All key strings rendered: `whoami`, `Nimo`, `Founding Engineer`, `part-time`, `Cognizant`, `LangGraph`, `nihalmohan46`, `Open to interesting work`, `// currently`, `// system info`, `copy`, `hire me`, `Nov 2025`, `Jun 2025`, `full-time`, `part-time`, `thanks for scrolling`.
    - `/nope` returns HTTP 404 (correct status), 31KB, with the `cd ~` button.
    - `/resume/Nihal_Mohan_Shettigar_Resume_Latest.pdf` returns HTTP 200, 105KB.
  - **Heads up:** your dev server at `localhost:3000` is serving slightly stale content (only 1 `scroll-mt-24` match in HTML, suggesting pre-polish state). Hard-refresh (Cmd/Ctrl+Shift+R) or restart the dev server to pick up the latest changes.

## Notes
- No fabricated projects. Only items from the user's 2026 resume.
- Personal brand: "Nimo" (matches folder name).
- Placeholder domain in metadata; user will wire real domain later.
- LatSpace is part-time, Cognizant is full-time (both current, concurrent).
- All copy lives in `lib/data/*.ts` for quick edits without touching components.
