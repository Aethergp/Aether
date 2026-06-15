# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Aether Global Pharma** (a pharmaceutical company). All user-facing content is **Portuguese (pt-BR)**. The current single home page was a **fast placeholder launch** — something live to show clients. The project is now in its **real phase: building the full, SEO-focused, multi-page site** from the content specs in `_docs/`, following the same guidelines (design, motion identity, components) the home page established.

## Building the full site — workflow (read before any new page)

This is mandatory process, not a suggestion. Every new page follows it.

1. **Read the page's content spec in `_docs/` first.** `_docs/spec-indice-geral.md` is the page index + status; the per-page specs carry the copy, section order, SEO fields, *and* a "Pendências / Decisões em aberto" list. There are **two doc generations**: the current `_docs/spec-*.md` set (post-11/06 decisions — authoritative) and the older `_docs/{pd,sobre}/**/pagina.md` deliverables (still the content source for `/pd`, `/pd/trl`, `/sobre`). The brand manual, identity, and photographic-direction references are PDFs in `_docs/original/`. The full route map + per-page gaps live in [.claude/NOTES.md](.claude/NOTES.md).
2. **Build to the design system.** Read [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md) and carry the full motion layer (green draw-on-scroll line + reveals) — a static page is a regression. Reuse the existing components; new shared moves go into the library.
3. **SEO is first-class.** Each route exports `metadata` (title / description / canonical / OG) — the specs give the exact title + meta description per page; use one `<h1>`, `<h2>` section headings, and the eyebrow/title/lead pattern. New routes are picked up by `next-sitemap` at build.
4. **Missing-info protocol (required every time).** Specs explicitly tag pending content (`⟨ PLACEHOLDER — A CONFIRMAR ⟩`, `[ANO]`, "Em aberto"). When a page has gaps, build with **clearly-marked temporary copy/names** (lorem ipsum, bracketed placeholders, placeholder imagery) — never present invented facts as real — and then **state exactly what is missing or temporary as the LAST thing in your response**, so the user is unmistakably aware before reviewing. Do this whenever a page is incomplete.
5. **Blog/news = static now, WordPress later** (see next section).
6. **Keep the shared docs current.** The team-shared agent docs are the git-tracked root `CLAUDE.md` plus everything in `.claude/` (`ART-DIRECTION.md`, `NOTES.md`). `CLAUDE.md` stays at the repo root because that's the only path Claude Code auto-loads; treat it and `.claude/` as one shared set. When conventions change, update them in the same change; when page status changes, update `.claude/NOTES.md`. **Persist durable project conventions here, in git — not only in local agent memory, which teammates don't get.**

## Blog / news (WordPress via GraphQL — later)

The `/midia` feed and `/midia/blog/[slug]` posts (spec: `_docs/spec-midia.md`) **ship static for now** — local/hardcoded data, no CMS. WordPress is **not in the project yet**.

- Later, a **headless WordPress** backend will be integrated **via GraphQL, and only on the blog/news pages** — no other page touches WordPress. `graphql-request` is already a dependency and `next.config.mjs` already whitelists images from `wp.aethergp.com.br`, so the groundwork exists.
- Build the static feed/post now with a **data shape that maps cleanly to a future WP GraphQL query** (post: slug, title, excerpt, date, category, cover image, body; plus curated external-link entries that open in a new tab with a marker), so the eventual swap is contained to those components.
- Launch content (≈4 entries: one internal post + three press links) is listed in `spec-midia.md`.

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

## Code style

Tabs (width 4), matching the existing files. **Keep comments minimal** — no section-label or "what this does" comments on self-explanatory JSX/markup (the user dislikes these). Comment only genuinely non-obvious logic, a gotcha that prevents a regression, or data that's temporary/placeholder. The grouping comments at the top of files (`// libraries`, `// components`, `// utils`, `// svg`) are an existing convention — keep them.

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

`PageTransition` (`src/components/Utils/PageTransition/index.tsx`) uses `next-transition-router` with an overlay that **mirrors the preloader** (`[data-page-transition]`): on leave a `green-light` curtain rises up from the bottom (`yPercent` 100→0) while the brand star slides in from the left and rotates; after the route swaps, on enter the star slides out to the right and the curtain continues up and off the top (`yPercent` 0→-100). **The star uses the preloader's exact timing** — `marginLeft -25rem→0→40rem`, `rotate 0→180→360`, `duration: 2`, `ease: power2.inOut` — so match those if you touch it. On **leave** it also `.kill()`s every `ScrollTrigger.getAll()`; on **enter complete** the inner `ScrollTriggerRefresher` calls `ScrollTrigger.refresh(true)`. So per-page ScrollTriggers are torn down and rebuilt across navigations — register them in component effects (`useGSAP`), not globally, so the refresh picks them up. The block's hidden state is an inline `transform: translateY(100%)` (below the viewport) that GSAP animates.

### 3. Preloader → global `init` event

`Preloader` (`src/components/Preloader/index.tsx`) runs a GSAP intro then sets `window.__aetherInit = true` and `dispatchEvent(new Event('init'))` on `window`. Entrance animations that must wait for the preloader (e.g. the `Banner` H1 SplitText reveal) `addEventListener('init', …, { once: true })` rather than running on mount. **The preloader only runs on a full page load** — on client-side nav back to home it won't re-fire, so gated animations must check `window.__aetherInit` and run immediately if it's already set (the `Banner` does this), else wait for the event. Reuse this for any "after preloader" animation.

### 4. SVG imports are React components

Configured via `@svgr/webpack` in `next.config.mjs` with `removeViewBox: false`. `import Icon from './x.svg'` gives a component; append `?url` (`import url from './x.svg?url'`) to get a URL string instead.

## Animations (GSAP)

GSAP is the **only** animation engine — `motion` is in `package.json` but unused. Plugins in play: **ScrollTrigger** and **SplitText**, registered at the top of each component that uses them (`gsap.registerPlugin(...)`). Everything runs through `@gsap/react`'s **`useGSAP`** (scoped, auto-cleans tweens/triggers on unmount). For the *design intent* of each effect (when to reach for which), see [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md) → Motion. This section is the mechanics.

### Six universal rules (every effect obeys these)

1. **`scroller: document.getElementById('viewport')` on every ScrollTrigger** — the page scrolls a `#viewport` div, not the window. Omit it and the trigger silently never fires.
2. **`await document.fonts.ready` before any `SplitText`** — otherwise lines are split against the fallback font and re-wrap when the webfont loads.
3. **Reveal once by default** (`once: true` / `toggleActions: 'play none none none'`). The `Stagger*` components and `AnimatedText` take an `infinite` prop to re-animate on scroll-back.
4. **Register triggers inside component `useGSAP`/effects, never globally** — `PageTransition` kills all ScrollTriggers on route leave and `ScrollTrigger.refresh(true)` on enter; only per-component triggers get rebuilt **on re-mount**. A *global* animated component (lives in the layout, never re-mounts — e.g. `Footer`) must depend its `useGSAP` on `usePathname()` to recreate, and use `gsap.fromTo` (see Gotchas).
5. **The hero waits for the preloader `init` event** — gate intro animations on `window.addEventListener('init', …, { once: true })`, not on mount. The preloader runs once per full load, so on client-side nav back to home `init` never re-fires — check `window.__aetherInit` (set by the preloader) and reveal immediately when already initialised.
6. **`refreshPriority` orders layout-changing triggers.** Pinned/scrub reveals that insert pin-spacers run first (`TextReveal` pinned mode uses `refreshPriority: 1`); background path-draws yield (`refreshPriority: -1`) so their start/end are measured against the final layout. After creating a pin programmatically, `requestAnimationFrame(() => ScrollTrigger.refresh(true))`.

### Reusable animation components (`src/components/Utils/Animations/`)

Compose these instead of writing raw GSAP. All are `'use client'`, scope to a ref, await `fonts.ready` where they split text, and use the `#viewport` scroller.

| Component | Mechanic | Key props |
|---|---|---|
| `AnimatedTitle` | Per-line two-tone gradient **fill** (`.fill-title`), `backgroundPositionX` scrubbed `top 75%`→`bottom 60%` | `style: 'light'\|'dark'` |
| `AnimatedText` | Char-by-char **rise** (`y:110%`, `circ.out`, stagger `.0075`) at `top 85%`; rebuilds `<br>` as `.br-line` spans so SplitText never sees the break; accepts an HTML `text` string; adds `.completed` | `text`, `infinite` |
| `TextReveal` | Per-line colored **block-wipe** (`scaleX` 0→1→0). Free mode fires once at `top 90%`; **pinned scrub mode** pins the section (`end: +=innerHeight*1.5`, `refreshPriority:1`) when given `scrub` + `pinSection` | `blockColor`, `scrub`, `pinSection`, `stagger`, `duration`, `animateOnScroll` |
| `StaggerUp` | Children `y:20vh`+`opacity:0`→in, `ScrollTrigger.batch`, stagger `.125`, start `-50% 100%` | `infinite` |
| `StaggerScale` | Children `scale:0`→`1`, batch, stagger `.125` | `infinite` |
| `StaggerOpacity` | Children `opacity:0`→`1`, batch, stagger `.2`, dur `1` | `infinite` |
| `Counter` | Count-up `0`→`number`, `pt-BR` thousands formatting, `toggleActions: play none none reverse` at `top 90%` | `number` |
| `ImageReveal` | Panel wipe (`width`→`100%`→`x:100%`) + image `scale:1.5`→`1`; `play`/`reverse` on enter/leave-back at `0% 120%` | `overlay` tint, `src`, `alt` |
| `ScrollingImage` | Vertical **parallax** — child grown to `calc(100% + 7rem)` (desktop) / `+3rem` (≤768px) and drifts `y`, `scrub:2`; re-inits on `pathname` | wraps an `Image` |
| `MagneticButton` | Cursor-follow (`Power4` toward, `Elastic` release); **desktop only** (`innerWidth > 540`); refreshes bounds on `#viewport` scroll + resize | `strength` (def 30) |
| `FollowMouse` | Drag-circle cursor follower inside a region; appears on enter/drag, hides on leave/scroll; **`max-md:hidden`** | `text`, `children` |

Also: **`Video`** (`src/components/Video`) plays/pauses on scroll in/out of view (`0% 120%`→`100% -20%`, muted/loop/`playsInline` mp4); **`Marquee`** (`src/components/Marquee`) + **`horizontalLoop`** (`src/utils/horizontalLoop.js`) = seamless infinite logo strip, responsive via `xPercent`, `reverse` prop.

### Signature bespoke recipes (written inline in sections, not componentized)

- **SVG path draw-on-scroll** (the recurring green stroke) is now the reusable **`StrokePath`** component (`src/components/Utils/Animations/StrokePath.tsx`) — pass `d` + `viewBox` (+ optional `start`/`end`), position with `className`; it draws on the parent section's scroll. Mechanic: `strokeDasharray = path.getTotalLength()`, scrub `strokeDashoffset` len→0, `ease:'none'`, `scroller:#viewport`, `refreshPriority:-1`. The older home sections (Context, Companies, Contact) still inline the same logic.
- **Pinned hero background** (`Banner`): the `[data-bg]` video is pinned (`pin`, `pinType:'fixed'`, `anticipatePin:1`) and `opacity`/`scale` scrubbed `top top`→`bottom top`; the `<h1>` is `SplitText` chars hidden at `y:110%`, released by the `init` listener with `back.out(1.7)`.
- **Footer reveal** (`src/components/Footer`): the footer is `position:sticky bottom-0 z-0 min-h-lvh` sitting **behind** `<main>` (`relative z-1`); the `<aside data-footer-spacer>` inside `<main>` is the trigger (`start:'top bottom'`, `end:'bottom 10%'`). As it enters: the giant wordmark letters (`[data-logo-footer] path`) rise `y:50vh`→`0` + `scale:0`→`1`, stagger `.05`, `scrub:3`; the black `[data-footer-shadow]` overlay fades `opacity`→`0`, `scrub:2` — the logo lifts out of darkness. Both are **`gsap.fromTo`** keyed on `usePathname()` so they recreate after every page transition (see Gotchas). "Voltar ao topo" animates `#viewport` scrollTop to 0.

### Gotchas (learned building `/contato`)

- **Tailwind v4 `scale-*`/`translate-*` utilities use the CSS `scale`/`translate` properties, which compose with — and can cancel — a GSAP `transform`.** A `scale-x-0` class on an element you then animate with `gsap.to(…, { scaleX: 1 })` stays collapsed (the CSS `scale: 0 1` multiplies GSAP's transform to zero). Set the hidden/animated state with an **inline `transform`** or `gsap.set`, never a Tailwind scale/translate class.
- **The green line (`StrokePath`) endpoints must be off-screen.** Use a path whose endpoints lie outside the visible area (negative-x, like the Context path) so the arc enters and exits off-screen; a visible endpoint reads as a bug. (Design rule in ART-DIRECTION → Depth.)
- **`TextReveal` on short text inline-flows and drops the break space.** Its per-line `.block-line-wrapper` is `inline-block w-max`; when split lines are each narrower than the container they sit side-by-side and the wrap space is lost (`colaboração` + `institucional` → `colaboraçãoinstitucional`). Use `TextReveal` only for headings whose lines fill the width; render short supporting lines plainly (or with a non-splitting reveal).
- **The header logo adapts per route.** `Menu` reads `usePathname()` → `darkHeader` (home only today) and fills the logo `green-light` over dark heroes vs `green-dark` over light pages. Add new dark-hero routes (`/pd`, `/sobre` banners) to that check when built.
- **Global animated components must recreate their ScrollTriggers on navigation.** `PageTransition` kills *every* ScrollTrigger on leave; per-page components re-mount and rebuild theirs, but a component that lives in the layout (e.g. `Footer`) never re-mounts — so depend its `useGSAP` on `usePathname()` (`{ dependencies: [pathname] }`) to re-run and recreate on each route change. And use **`gsap.fromTo` with explicit from/to states**, never `gsap.from`/`gsap.to`: on recreation, `from`/`to` read the element's *current* (possibly mid-killed) value as the target and can animate it to a no-op — this is exactly why the footer wordmark got stuck hidden after the first navigation.

### Responsiveness & "nothing breaks on desktop/tablet/mobile"

- **Smooth scroll is desktop-only.** `SmoothScroller` UA-sniffs mobile and falls back to native scroll (no wheel-lerp); it sets `ScrollTrigger.config({ ignoreMobileResize: true })` so mobile URL-bar resizes don't thrash triggers.
- **Never size full-height with `100vh` on mobile.** `ViewportHeight` writes `--vh` from the *real* `#viewport.clientHeight` (accounts for iOS URL bar via `visualViewport`, `orientationchange`, and a polling fallback) and adds an `is-ios` class. Use `h-[calc(var(--vh)*100)]` for full-height blocks; `is-ios` forces those to `100svh`. The hero uses `h-svh`/`min-h-lvh`.
- **Per-component device gates** (already built in, mirror them in new work): `MagneticButton` → `innerWidth > 540`; `ScrollingImage` parallax → `7rem` desktop vs `3rem` ≤768px; `FollowMouse` circle → `max-md:hidden`. Mobile gets the calm version of every effect, not the desktop one.
- **`prefers-reduced-motion` is NOT currently handled** — there's no reduced-motion path. Treat adding one as a known gap if accessibility comes up; don't claim it exists.
- **Cross-device check before shipping a section:** desktop (smooth scroll + magnetic + any follow-mouse), tablet, and mobile (native scroll, no magnetic, `--vh` heights, reduced parallax). Confirm pinned/scrub reveals **release cleanly and don't overlap** — that's what `refreshPriority` ordering protects, and it's the most common thing to break when several pins/draws share a page.

## Styling

Tailwind CSS v4, **CSS-first config** — there is no `tailwind.config`. Design tokens live in `@theme {}` in `src/assets/css/base/theme.pcss` (colors like `green-dark`/`green-light`/`green-pale`, Bootstrap-matched breakpoints, fonts). Base layers are split across `src/assets/css/base/*.pcss` and imported through `src/assets/css/global.css`. Note the font tokens read inverted: `--font-heading` is **Inter**, `--font-body` is **Syne** (both loaded via `next/font/google` in `layout.tsx`).

## Routing & layout

`src/app/layout.tsx` is the single global shell: it mounts `Preloader`, `PageTransition` → `SmoothScroller` → `Menu` + `<main>{children}</main>` + `Footer`, plus the Organization JSON-LD, OG metadata, and Google Analytics. The home page is composed in `src/app/home/page.tsx` from section components (`Banner`, `Context`, `About`, `Companies`, `Partners`, `Contact`); root `src/app/page.tsx` just re-exports it. Shared route/contact/social constants live in `src/utils/routes.js`.

**Navigation links live once in `navLinks` (`src/utils/routes.js`)** — the single source of truth for the **three nav surfaces**: the desktop header, the mobile (fullscreen) menu (both in `Menu`), and the `Footer`. All three `.map()` over `navLinks`, so changing a destination updates all three at once (the desktop header filters out the `home: true` entry — the logo covers it). Anchors (`#…`) scroll the home via `useAnchorScroll`; routes (`/…`) navigate; the `home` entry (`/`) navigates home from other pages but scrolls to top when you're already on home. When a section becomes a real page (e.g. `/sobre`), flip its entry from `#…` to `/…` here once. In-page contact CTAs (Banner/About "Entre em contato") point at `/contato`, not the home `#contato` section.

## Forms

All forms are composed from the **`Form` family in `src/components/Form/index.tsx`** (built on `react-hook-form`) and POST to a generic email route. See [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md) → Forms for the design/usage rules; this is the wiring.

### Client components (`@/components/Form`)

`Form` wraps children in a RHF `FormProvider` (`mode: 'all'`, `criteriaMode: 'all'`); every field calls `useFormContext()`, so fields must live inside a `Form`. Exported building blocks:

- **`Input`** — `id`, `label`, `name`, `type`, `placeholder`, `required?`, `maxLength?`, `minLength?`, `match?` (confirm-password), `hideLabel?`, `hidePasswordToggle?`, `disabled?`, `onChange?`. Builds RHF validations with pt-BR messages; `type='email'` adds a pattern check; `type='password'` adds an eye toggle.
- **`Textarea`** — `id`, `label`, `name`, `placeholder`, `required?`, `min/maxLength?` (`resize-y`, `min-h-42`).
- **`Checkbox`** — `type: 'checkbox' | 'radio'`, `id`, `label`, `name`, `required?`, `checked?`, `children?` (rich label, e.g. a confidentiality note with a link). Custom-styled box; the field `value` is the `label`.
- **`InputHidden`** — `name`, `value`, `id`. Used to tag the source (`<InputHidden name='form' value='contact' />`) and as the honeypot slot.
- **`Submit`** — `text`, `style: 'light' | 'dark'`. Renders the `Button` (type submit, diagonal-arrow) carrying `data-submit-button`/`data-spinner`.
- **`Label`**, **`Modal`** are also exported.

### Submission flow (automatic — don't hand-roll a handler)

On submit, `Form`: sets `data-is-sending='true'` on the `<form>` and dispatches a `formSending` event → builds the body (`JSON.stringify(data)`, or `FormData` when `isFormData` is set) → `fetch(endpoint, { method:'post', body })` → on **ok**, renders the success `Modal` and (after a ~1s delay) opens it via `dialog.showModal()`, resets `data-is-sending`, dispatches `formSent`, and if `clearOnSubmit` resets the form + dispatches `formReset`; on **error**, renders the error `Modal` and dispatches `formError`. The `data-is-sending` attribute is what swaps the submit icon for the spinner (CSS selectors on the `<form>`). `Form` props: `endpoint`, `onSuccess {title,text}`, `onError {title,text}`, `clearOnSubmit?`, `isFormData?`, `className?`.

### Field name → email mapping (important)

The route emails **every field as a `key: value` row using the field `name` verbatim**, so name fields with the human-readable label you want in the email (`name='Nome'`, `name='Mensagem'`, `name='Assunto'`). **A field named exactly `Email` (capital E) is required** — `/api/resend` 400s without `body.Email`, and uses it as the `replyTo`. `form` and `company` are stripped from the body.

### Form controls — built and still-missing

- **`Select`** and **`Honeypot`** now exist in `Form/index.tsx` (added for `/contato`). `Select` mirrors `Input` — register via `useFormContext`, same wrapper/`Label`/error-badge pattern, `appearance-none` + a positioned chevron — and takes `options: {value,label}[]` + `placeholder`. `Honeypot` is an off-screen `company` text field the route already drops. New form controls follow this same pattern.
- **Subject-in-title is done** — `/api/resend` now uses `body.Assunto` in the email subject when present.
- **Still missing: a file-upload control** (`/inscreva-seu-projeto` needs PDF ≤15MB). `isFormData` is supported client-side, but the route does **not** attach files — extend it (Resend `attachments`, or upload to storage and link) before wiring a real upload.

### The email route (`src/app/api/resend/route.ts`)

POST handler: serializes submitted fields into an HTML table and sends via Resend (`RESEND_API_KEY` required at module load). Requires `body.Email`; `company` is a honeypot (silently 200s if filled); `form` + `company` are excluded from the body. Destination is hard-coded in `getDestinationEmail()`.

### Modals (`Dialog` + `Portal`)

Success/error feedback renders through `Modal` → `Dialog` (`@/components/Dialog`) inside a `Portal` (into `#portal`). `Dialog` uses a native `<dialog>` opened with `showModal()`; it adds `no-scroll` to `<body>` while open, closes on backdrop click / `Escape` / any `[data-dialog-close]` element, and can also be opened by any `[data-dialog]` element whose `href="#id"` points at it. Reuse this for any modal, not just form feedback.

## Images

`next/image` is set to `unoptimized: true` with the only remote host being the headless WordPress backend `wp.aethergp.com.br` (`graphql-request` is a dependency for future CMS data; not yet wired into built pages). Use the local `src/components/Image` wrapper for project images.
