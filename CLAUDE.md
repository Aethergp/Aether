# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Aether Global Pharma** (a pharmaceutical company). All user-facing content is **Portuguese (pt-BR)**. Currently a single-page site (the home page); `_docs/*.md` hold Portuguese content specs for additional pages (`/sobre`, `/pd`, `/midia`, `/contato`, `/inscreva-seu-projeto`) that are planned but not yet built.

## Commands

```bash
npm run dev      # Next.js dev server
npm run build    # production build; postbuild auto-runs next-sitemap (generates sitemap + robots.txt)
npm run start    # serve the production build
npm run lint     # next lint (ESLint 9, eslint-config-next)
```

There is **no test suite**. `RESEND_API_KEY` must be set (`.env.local`) or the `/api/resend` route throws at module load.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS v4 · GSAP · Resend. Path alias `@/*` → `./src/*`. `reactStrictMode: false` is intentional — Strict Mode's double-mount re-fires the GSAP/animation effects.

## Design language

**Before building or restyling any section or page, read [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md).** It's the visual playbook (the *feeling*, plus the concrete grid, type scale, color tokens, reusable animation components, and composition patterns) derived from the home page. The default "flat white block with a centered title" is **not** the bar — the look is calm/editorial/asymmetric, olive-green on warm white, built on a Bootstrap 12-column grid with content revealed via the GSAP components in `src/components/Utils/Animations/`.

## Architecture — the non-obvious parts

These four mechanisms are interdependent and span multiple files. Understand them before touching scroll, animation, or navigation code.

### 1. Custom smooth scroll — the page does NOT scroll the window

`SmoothScroller` (`src/components/Utils/SmoothScroller/index.tsx`) wraps all content in a `#viewport` div that owns the scroll. On desktop it `preventDefault()`s wheel events and lerps `viewport.scrollTop` via `requestAnimationFrame`. On mobile (UA-sniffed) it falls back to native scroll. Consequences:

- **Any GSAP ScrollTrigger must pass `scroller: document.getElementById('viewport')`** (see `Banner.tsx`). Without it, triggers read the window scroll and never fire.
- **Anchor/in-page navigation uses the `useAnchorScroll` hook** (`src/hooks/useAnchorScroll.ts`), which `gsap.to`'s `viewport.scrollTop` — never `window.scrollTo` or `scrollIntoView`. Target offset is `getBoundingClientRect().top + viewport.scrollTop`.
- To freeze scrolling (e.g. open menu), set `data-scroll-paused` on `#viewport`; the wheel handler bails while it's present.

### 2. Page transitions kill & rebuild ScrollTriggers

`PageTransition` (`src/components/Utils/PageTransition/index.tsx`) uses `next-transition-router` with stacked GSAP overlay panels (`[data-page-transition]`). On **leave** it `.kill()`s every `ScrollTrigger.getAll()`; on **enter complete** the inner `ScrollTriggerRefresher` calls `ScrollTrigger.refresh(true)`. So per-page ScrollTriggers are torn down and rebuilt across navigations — register them in component effects (`useGSAP`), not globally, so the refresh picks them up.

### 3. Preloader → global `init` event

`Preloader` (`src/components/Preloader/index.tsx`) runs a GSAP intro then `dispatchEvent(new Event('init'))` on `window`. Entrance animations that must wait for the preloader (e.g. the `Banner` H1 SplitText reveal) `addEventListener('init', …, { once: true })` rather than running on mount. Reuse this event to gate any "after preloader" animation.

### 4. SVG imports are React components

Configured via `@svgr/webpack` in `next.config.mjs` with `removeViewBox: false`. `import Icon from './x.svg'` gives a component; append `?url` (`import url from './x.svg?url'`) to get a URL string instead.

## Styling

Tailwind CSS v4, **CSS-first config** — there is no `tailwind.config`. Design tokens live in `@theme {}` in `src/assets/css/base/theme.pcss` (colors like `green-dark`/`green-light`/`green-pale`, Bootstrap-matched breakpoints, fonts). Base layers are split across `src/assets/css/base/*.pcss` and imported through `src/assets/css/global.css`. Note the font tokens read inverted: `--font-heading` is **Inter**, `--font-body` is **Syne** (both loaded via `next/font/google` in `layout.tsx`).

## Routing & layout

`src/app/layout.tsx` is the single global shell: it mounts `Preloader`, `PageTransition` → `SmoothScroller` → `Menu` + `<main>{children}</main>` + `Footer`, plus the Organization JSON-LD, OG metadata, and Google Analytics. The home page is composed in `src/app/home/page.tsx` from section components (`Banner`, `Context`, `About`, `Companies`, `Partners`, `Contact`); root `src/app/page.tsx` just re-exports it. Shared route/contact/social constants live in `src/utils/routes.js`.

## Contact form → email

`src/app/api/resend/route.ts` (POST) is a generic form-to-email handler: it serializes all submitted fields into an HTML table and sends via Resend. An `Email` field is required; `company` is a honeypot (silently 200s if filled); `form` and `company` are excluded from the email body. The destination address is hard-coded in `getDestinationEmail()`.

## Images

`next/image` is set to `unoptimized: true` with the only remote host being the headless WordPress backend `wp.aethergp.com.br` (`graphql-request` is a dependency for future CMS data; not yet wired into built pages). Use the local `src/components/Image` wrapper for project images.
