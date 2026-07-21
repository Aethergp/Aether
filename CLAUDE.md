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

There is **no test suite**. `RESEND_API_KEY` must be set (`.env.local`) or the `/api/resend` route throws at module load. R2 env vars (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT`) must also be set for the file upload flow on `/inscreva-seu-projeto` to work.

## Stack

Next.js 15 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS v4 · GSAP · Resend · **ogl** (WebGL, for the `Grainient` animated-gradient background). Path alias `@/*` → `./src/*`. `reactStrictMode: false` is intentional — Strict Mode's double-mount re-fires the GSAP/animation effects.

## Code style

Tabs (width 4), matching the existing files. **Keep comments minimal** - no section-label or "what this does" comments on self-explanatory JSX/markup (the user dislikes these). Comment only genuinely non-obvious logic, a gotcha that prevents a regression, or data that's temporary/placeholder. The grouping comments at the top of files (`// libraries`, `// components`, `// utils`, `// svg`) are an existing convention - keep them.

**Never use the em dash (`—`). Always use a regular hyphen (`-`)** - in all user-facing copy (pt-BR content, titles, excerpts, article bodies) and in code/comments alike. This is a hard project rule; the whole `src/` tree was normalized to `-`, so don't reintroduce `—` when writing or editing content.

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

`PageTransition` (`src/components/Utils/PageTransition/index.tsx`) uses `next-transition-router` with an overlay (`[data-page-transition]`): on leave a `green-light` curtain rises up from the bottom (`yPercent` 100→0) while the brand star slides in from the left and rotates; after the route swaps, on enter the star slides out to the right and the curtain continues up and off the top (`yPercent` 0→-100). **The star timing is** `marginLeft -25rem→0→40rem`, `rotate 0→180→360`, `duration: 2`, `ease: power2.inOut` — so match those if you touch it. On **leave** it also `.kill()`s every `ScrollTrigger.getAll()`; on **enter complete** the inner `ScrollTriggerRefresher` calls `ScrollTrigger.refresh(true)`. So per-page ScrollTriggers are torn down and rebuilt across navigations — register them in component effects (`useGSAP`), not globally, so the refresh picks them up. The block's hidden state is an inline `transform: translateY(100%)` (below the viewport) that GSAP animates.

### 3. No preloader - the hero paints immediately

There is **no preloader** and no global `init` event (both removed for Core Web Vitals: the overlay
held an opaque full-screen curtain for ~3s and gated the `<h1>`, so LCP could never fire earlier).
Entrance animations run **on mount** - the `Banner` H1 SplitText reveal uses `gsap.fromTo` inside
`useGSAP` after `await document.fonts.ready`. **Never reintroduce a load-blocking overlay or an
`init`-style gate on above-the-fold content.** `PageTransition` (route changes only) is unaffected.
### 4. SVG imports are React components

Configured via `@svgr/webpack` in `next.config.mjs` with `removeViewBox: false`. `import Icon from './x.svg'` gives a component; append `?url` (`import url from './x.svg?url'`) to get a URL string instead.

## Animations (GSAP)

GSAP is the **only** animation engine — `motion` is in `package.json` but unused. Plugins in play: **ScrollTrigger** and **SplitText**, registered at the top of each component that uses them (`gsap.registerPlugin(...)`). Everything runs through `@gsap/react`'s **`useGSAP`** (scoped, auto-cleans tweens/triggers on unmount). For the *design intent* of each effect (when to reach for which), see [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md) → Motion. This section is the mechanics.

### Six universal rules (every effect obeys these)

1. **`scroller: document.getElementById('viewport')` on every ScrollTrigger** — the page scrolls a `#viewport` div, not the window. Omit it and the trigger silently never fires.
2. **`await document.fonts.ready` before any `SplitText`** — otherwise lines are split against the fallback font and re-wrap when the webfont loads.
3. **Reveal once by default** (`once: true` / `toggleActions: 'play none none none'`). The `Stagger*` components and `AnimatedText` take an `infinite` prop to re-animate on scroll-back.
4. **Register triggers inside component `useGSAP`/effects, never globally** — `PageTransition` kills all ScrollTriggers on route leave and `ScrollTrigger.refresh(true)` on enter; only per-component triggers get rebuilt **on re-mount**. A *global* animated component (lives in the layout, never re-mounts — e.g. `Footer`) must depend its `useGSAP` on `usePathname()` to recreate, and use `gsap.fromTo` (see Gotchas).
5. **Above-the-fold intros run on mount, never behind a gate.** There is no preloader/`init` event; use `gsap.fromTo` in `useGSAP` (after `document.fonts.ready` when splitting text) so the hero is paintable as early as possible. Don't gate LCP content on an overlay, a timer, or a custom event.
6. **`refreshPriority` orders layout-changing triggers.** Pinned/scrub reveals that insert pin-spacers run first (`TextReveal` pinned mode uses `refreshPriority: 1`); background path-draws yield (`refreshPriority: -1`) so their start/end are measured against the final layout. After creating a pin programmatically, `requestAnimationFrame(() => ScrollTrigger.refresh(true))`.

### Reusable animation components (`src/components/Utils/Animations/`)

Compose these instead of writing raw GSAP. All are `'use client'`, scope to a ref, await `fonts.ready` where they split text, and use the `#viewport` scroller.

| Component | Mechanic | Key props |
|---|---|---|
| `AnimatedTitle` | Per-line two-tone gradient **fill** (`.fill-title`), `backgroundPositionX` scrubbed `top 75%`→`bottom 60%` | `style: 'light'\|'dark'\|'wine'` (`dark`=fills to green-dark, `wine`=fills to `#3D0108` for the Bio+/ICT page) |
| `AnimatedText` | Char-by-char **rise** (`y:110%`, `circ.out`, stagger `.0075`) at `top 85%`; rebuilds `<br>` as `.br-line` spans so SplitText never sees the break; accepts an HTML `text` string; adds `.completed`. **Renders `text` server-side** (see below) | `text`, `infinite` |
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
- **Animated WebGL gradient — `Grainient`** (`src/components/Grainient/index.tsx`, `'use client'`, needs **`ogl`**): a grainy, warping color-field rendered to a `<canvas>` (vendored from React Bits, ported to TS). All look is prop-driven (`color1/2/3`, `timeSpeed`, `warpFrequency/Speed/Amplitude`, `rotationAmount`, `noiseScale`, `grain*`, `contrast`, `zoom`, `centerX/Y` …); pass **green tokens** (`#555328`/`#90916c`/etc.) for the AGP surface or the Bio+ blues. Two effects: one builds the GL context **once** (a module `WeakMap` keeps `renderer`/`program` alive so prop changes only update uniforms — no context rebuild), the other syncs props→uniforms; it **self-pauses** when offscreen (IntersectionObserver) or the tab is hidden (`visibilitychange`), and caps `dpr` at 2. Use it as a background: a positioned parent + `<Grainient className='w-full h-full'/>` at `z-0`, a **uniform** tint (`bg-green-dark/35`) + content above for text legibility. Reference: the `/sobre` hero+valores share **one** Grainient field spanning both sections.
- **Scroll-driven color-shifting `Grainient` field across multiple sections** (`/sobre/ict-aether-bio`: `Hero.tsx` + `BioGrainient.tsx`). One continuous field spans the hero + the premissa quote + the pinned-circles section, and its 3 colors **lerp on scroll** (green-led at the top → more blue + terracotta, a touch less green, at the bottom — the Bio+ identity emerging as you descend). Mechanics: (1) **Scope the fixed field with `clipPath`** — a `position:fixed` `<Grainient>` lives inside a background-only `absolute inset-0` div that carries an inline `clipPath:'inset(0% 0% 0% 0%)'`; the clip establishes a containing block so the fixed field is clipped to that area (stays viewport-fixed while you scroll the section, then disappears at the next section). Same trick as `/sobre`'s shared field. (2) **Own the color state in a SMALL child** (`BioGrainient`) so only it re-renders per scroll frame, not the whole hero: a scrubbed `ScrollTrigger` (`trigger:#section-id`, `top top`→`bottom bottom`, `refreshPriority:-1`) `onUpdate` hex-lerps `color1/2/3` from a START to an END palette and `setColors` — the Grainient's props→uniforms effect re-tints with **zero teardown** (no GL rebuild). (3) **Uniform tint** (`bg-black/25`, neutral) over the whole field so it biases neither the green top nor the blue/terracotta bottom. **Keep the `clipPath` OFF any ancestor of a pinned element in the same section** (see the pin-jitter gotcha) — put it only on the background-sibling layer.
- **The Menu (`src/components/Menu/index.tsx`) — header + fullscreen "fs" menu.** Two surfaces driven by `routes.js` (`headerLinks` desktop, `navLinks` fs/mobile; both can carry `children`).
  - **Desktop header** (`max-lg:hidden`): each item is a `dark` `Button`; items with `children` pass **`chevron`** (down-chevron that rotates `group-hover`) and render a **hover dropdown** — `<li class='relative group'>` + an absolute `top-full` `group-hover` `green-pale` panel of child `Link`s. Logo + hamburger are wrapped in `MagneticButton`. `darkHeader` (`usePathname`) flips the logo `green-light`/`green-dark`.
  - **FS menu = a layered curtain reveal.** **Three stacked full-height `<aside>` panels** slide in from the right with **staggered z / colour / duration** so they fan out as they open and re-stack as they close: `z-97 bg-green-dark duration-300` (back, fastest) · `z-98 bg-green-pale duration-400` (mid) · `z-99 bg-green-light duration-500` (front, holds the content, slowest). All toggle `translate-x-[120%]`→`translate-x-0` on `isOpen`. A separate `data-fs-overlay` (`z-97 bg-black/90`, `duration-300`) dims the page and closes on click. `Escape` closes; while open, `#viewport` gets `overflow:hidden` + `data-scroll-paused`.
  - **Cascade-in items.** Each fs `<li>` is a **green block** (`bg-green-dark/[0.07] px-4 rounded-sm`) that starts `translate-x-30 opacity-0` and animates to `translate-x-0 opacity-100` when `isOpen`, with an inline **`transitionDelay: i*50 + 150ms`** so items cascade in (and reverse out). Item links are `text-30`, `w-full py-4`.
  - **Accordion submenus** (Sobre / P&D). A **boxed +/- toggle** (`w-10 h-10 rounded-xs bg-green-dark`, thin `w-3 h-px` / `h-3 w-px` bars; the vertical bar `scale-y-0` when open → `+`/`−`) expands a child list via a **`grid-rows-[0fr]→[1fr]`** transition. Children are **pill-buttons** (`bg-green-dark/[0.07] rounded-md px-5 py-3.5 text-18`, `hover:bg-green-dark`) with a trailing **right arrow** (`arrow-right.svg` — a plain `→`, **not** the diagonal `arrow-diagonal` which reads as an external link) that nudges `translate-x-1` on hover. `openAccordions: number[]` state.
- **Timeline scroll-paint** (`src/app/sobre/Timeline.tsx`, `'use client'`): a vertical line that draws `green-dark` top→bottom on scroll while each node dot "lights up" to `green-light`+glow exactly as the line reaches it. **One** scrubbed `ScrollTrigger` (`trigger:root`, `start:'top 65%'`, `end:'bottom 65%'`, `scrub`) drives BOTH from the same `onUpdate(self.progress)`: `gsap.set(fill,{scaleY:p})` paints the line (a `top-0 bottom-0 origin-top` span over a faint track), and `filledPx = root.offsetHeight*p` is compared to each node's center (`getBoundingClientRect` rel. to root) to toggle lit/unlit. **Do not** split the node lighting into per-node triggers — that lit them at fixed scroll points unrelated to the line and lagged behind it.

### `AnimatedText` must render its text server-side

`AnimatedText` splits and animates by rewriting `innerHTML` in its effect. It used to return an
**empty** `<span>`, so every heading and paragraph written as `<AnimatedText text='...' />` was blank
in the SSR HTML - including the `<h1>` on most routes. It now renders `text` into the span
(`dangerouslySetInnerHTML` for the HTML-string case, children otherwise) and the effect replaces it
after mount. **Keep it that way**: an animation wrapper must never be the only thing standing between
the copy and the server-rendered HTML.

It also skips `await document.fonts.ready` when `document.fonts.status === 'loaded'`, so on the common
path the split runs synchronously inside the layout effect and the server-rendered text never paints
unsplit for a frame. The await still happens on a cold font load, which is what the
"`await fonts.ready` before SplitText" rule actually protects against.

### Gotchas (learned building `/contato`)

- **Tailwind v4 `scale-*`/`translate-*` utilities use the CSS `scale`/`translate` properties, which compose with — and can cancel — a GSAP `transform`.** A `scale-x-0` class on an element you then animate with `gsap.to(…, { scaleX: 1 })` stays collapsed (the CSS `scale: 0 1` multiplies GSAP's transform to zero). Set the hidden/animated state with an **inline `transform`** or `gsap.set`, never a Tailwind scale/translate class.
- **A `clip-path` (or `transform`) ancestor over a `pinType:'fixed'` pinned element makes it drift/jitter on scroll.** `pinType:'fixed'` (the jitter-free default used by `Banner` and the esfera home) sets the pinned element `position:fixed`, anchored to the **viewport**. But a `clip-path`/`transform`/`filter`/`will-change` ancestor creates a *containing block for fixed descendants*, so the pin anchors to that (scrolling) box instead → the element visibly drifts. This bit us combining the scroll-color field (which needs a `clip-path` to scope its fixed `<Grainient>`) with the pinned circles on `/sobre/ict-aether-bio`. **Fix: put the `clip-path` only on a background-only *sibling* layer (`BioGrainient`'s `absolute inset-0` div), never on the `<section>` that contains the pinned element** — then the pinned circles have no clip-path/transform ancestor and `pinType:'fixed'` holds rock-solid (verified: 0px drift in x & y). `pinType:'transform'` "works" inside a clip-path but sub-pixel-drifts under scrub — don't reach for it as the fix; remove the offending ancestor instead. (`position:relative` alone does NOT create a fixed-containing-block, so a plain `relative` section is fine.)
- **The green line (`StrokePath`) endpoints must be off-screen.** Use a path whose endpoints lie outside the visible area (negative-x, like the Context path) so the arc enters and exits off-screen; a visible endpoint reads as a bug. (Design rule in ART-DIRECTION → Depth.)
- **`TextReveal` on short text inline-flows and drops the break space.** Its per-line `.block-line-wrapper` is `inline-block w-max`; when split lines are each narrower than the container they sit side-by-side and the wrap space is lost (`colaboração` + `institucional` → `colaboraçãoinstitucional`). Use `TextReveal` only for headings whose lines fill the width; render short supporting lines plainly (or with a non-splitting reveal). **Don't `TextReveal` a variable-length heading either** (e.g. a blog post `<h1>` whose title length is unknown) — same space-loss bug fires when it wraps; use `AnimatedText` for those.
- **A `Stagger*` child must not also carry a hover transform** — the `Stagger*` components animate `y`/`scale`/`opacity` on their **direct children**, and a child that also has a Tailwind transform on hover (e.g. `MediaCard`'s `hover:-translate-y-2!`) fights/overrides the stagger's `y` (same root cause as the Tailwind-scale/GSAP-transform gotcha below). **Wrap the interactive element in a plain `<div>` and let the stagger animate the wrapper** while the inner element owns the hover transform (`<StaggerUp><div><MediaCard/></div></StaggerUp>` — see the `/midia` feed grid). In a Swiper the slide element is the separate wrapper, so no extra div is needed there.
- **The header logo adapts per route.** `Menu` reads `usePathname()` → `darkHeader` (currently `/`, `/parceiros`, `/sobre`, `/404`) and fills the logo `green-light` over dark heroes vs `green-dark` over light pages. **Add a route to `darkHeader` whenever its hero is dark** (e.g. `/sobre`'s Grainient hero) and leave it out when the hero is light; the header is `position:absolute top-0` so only the top of the page matters.
- **Recolor a single-color SVG icon to an exact token via a CSS `mask-image`, not `brightness-0 invert`.** `invert` only gives white/black; to tint an icon (loaded as an `<Image>`/URL) to a brand token, render a `<span>` with `bg-{token}` + inline `maskImage:url(icon)` (`maskSize:contain`, `maskRepeat:no-repeat`, `maskPosition:center`) on a sized square. This is how the `/sobre` pillar icons become `green-light` (on green-dark) and `white` (on the Bio+ navy) at the exact token color.
- **One continuous background across sections — don't add a per-block scrim.** When a `Grainient` (or any field) spans several stacked sections, a scrim/overlay applied to only ONE block (e.g. a hero-bottom gradient) makes a visible **seam** at that block's edge. Use a single **uniform** tint over the whole shared-background section for legibility; the `/sobre` hero→valores seam was exactly this.
- **Reuse a home section on another route via a prop, don't fork it.** `/sobre` renders the home `<Context />` directly; to drop its pinned "A Aether foi criada…" statement there it takes a **`showCreation` prop (default `true`)** so home is unchanged. Prefer a small opt-out prop over duplicating the markup.
- **Preview-tool flakiness: `requestAnimationFrame` is throttled when the headless preview tab is backgrounded**, so GSAP time barely advances - a scroll/entrance animation appears frozen or crawls forward one step per screenshot. This is **not a code regression** - confirm with a server-side check (`curl` the route → 200 + the `<h1>` text in the SSR HTML, `tsc --noEmit`), and read animation *state* from the DOM rather than trusting a single screenshot. Restart the preview server for a clean browser state if needed.
- **Global animated components must recreate their ScrollTriggers on navigation.** `PageTransition` kills *every* ScrollTrigger on leave; per-page components re-mount and rebuild theirs, but a component that lives in the layout (e.g. `Footer`) never re-mounts — so depend its `useGSAP` on `usePathname()` (`{ dependencies: [pathname] }`) to re-run and recreate on each route change. And use **`gsap.fromTo` with explicit from/to states**, never `gsap.from`/`gsap.to`: on recreation, `from`/`to` read the element's *current* (possibly mid-killed) value as the target and can animate it to a no-op — this is exactly why the footer wordmark got stuck hidden after the first navigation.

### Responsiveness & "nothing breaks on desktop/tablet/mobile"

- **Smooth scroll is desktop-only.** `SmoothScroller` UA-sniffs mobile and falls back to native scroll (no wheel-lerp); it sets `ScrollTrigger.config({ ignoreMobileResize: true })` so mobile URL-bar resizes don't thrash triggers.
- **Never size full-height with `100vh` on mobile.** `ViewportHeight` writes `--vh` from the *real* `#viewport.clientHeight` (accounts for iOS URL bar via `visualViewport`, `orientationchange`, and a polling fallback) and adds an `is-ios` class. Use `h-[calc(var(--vh)*100)]` for full-height blocks; `is-ios` forces those to `100svh`. The hero uses `h-svh`/`min-h-lvh`.
- **Per-component device gates** (already built in, mirror them in new work): `MagneticButton` → `innerWidth > 540`; `ScrollingImage` parallax → `7rem` desktop vs `3rem` ≤768px; `FollowMouse` circle → `max-md:hidden`. Mobile gets the calm version of every effect, not the desktop one.
- **`prefers-reduced-motion` is NOT currently handled** — there's no reduced-motion path. Treat adding one as a known gap if accessibility comes up; don't claim it exists.
- **Cross-device check before shipping a section:** desktop (smooth scroll + magnetic + any follow-mouse), tablet, and mobile (native scroll, no magnetic, `--vh` heights, reduced parallax). Confirm pinned/scrub reveals **release cleanly and don't overlap** — that's what `refreshPriority` ordering protects, and it's the most common thing to break when several pins/draws share a page.

## Styling

Tailwind CSS v4, **CSS-first config** — there is no `tailwind.config`. Design tokens live in `@theme {}` in `src/assets/css/base/theme.pcss` (colors, Bootstrap-matched breakpoints, fonts). Base layers are split across `src/assets/css/base/*.pcss` and imported through `src/assets/css/global.css`. Note the font tokens read inverted: `--font-heading` is **Inter**, `--font-body` is **Syne** (both loaded via `next/font/google` in `layout.tsx`).

**Color tokens.** The live, canonical surface is the olive greens (`green-dark`/`green-pale`/`green-light`). The client-confirmed **full brand palette** is also tokenized (the "Brand palette" block in `theme.pcss`): `cream`/`citron`/`olive` (col 1), `beige`/`burgundy`/`burnt` (col 2), `cyan`/`navy-mid`/`sapphire` (col 3) → utilities like `bg-burgundy`, `from-sapphire to-navy-mid`. The greens map onto it (`green-dark` = Olive, `green-light` = Citron). **`sapphire #01083A` / `navy-mid #323F70` are exact (the Bio+/ICT tones); `cream`/`beige`/`burgundy`/`burnt`/`cyan` are ESTIMATED from the swatch image and flagged `/* confirm */`** — get exact hexes from the client before relying on them. The Bio+/ICT entity uses the blues (Sapphire/Navy-mid + the `blue`/`blue-dark` Button variants + the navy gradient on the `/sobre` ICT card); its identity is a multi-colour *degradê* (a `Grainient` with the Bio+ palette is the natural background for `/sobre/ict-aether-bio`). **`light-blue #AECBEC`** is a derived **light-blue UI tint** (NOT a manual swatch - flagged `/* confirm */`) for text/icons on the Bio+ navy surfaces (the `/sobre/ict-aether-bio` funções pills, governança card, and `blue-dark` button all read in `light-blue` on `sapphire`/`navy-mid`). **`wine #3D0108`** (dark red-brown, + `wine--20` faded) **replaces green for the white-section TEXT on `/sobre/ict-aether-bio`** (eyebrows/body get `text-wine`; the headings use `AnimatedTitle style='wine'`) - so that page's running text is dark-red, not olive; the lone green element kept there is the AGP cross-link card (it represents the green AGP entity).

## Routing & layout

`src/app/layout.tsx` is the single global shell: it mounts `PageTransition` → `SmoothScroller` → `Menu` + `<main>{children}</main>` + `Footer`, plus the JSON-LD `@graph` (Organization + ResearchOrganization + WebSite, from `src/utils/schema.ts`) and OG metadata. The home page is composed **directly in `src/app/page.tsx`** from section components in `src/app/_home/` (`Banner`, `Context`, `About`, `Companies`, `Partners`, `Contact`) - `_home` is an underscore-prefixed **private folder** so it produces no route (there used to be a duplicate `/home` route competing with `/` for indexing; `/home` now 308s to `/` via `next.config.mjs`). Shared route/contact/social constants live in `src/utils/routes.js`.

**Navigation links live in `src/utils/routes.js`, and the three surfaces are decoupled** — edit each independently:
- **`headerLinks`** → desktop header (`Menu`, `max-lg:hidden`). Trimmed: **Sobre / P&D / Mídia / Contato** (Inscreva is **commented out** — kept only in the fs menu + footer). Items with `children` render the hover dropdown + chevron.
- **`navLinks`** → the **fullscreen (fs) mobile menu** (`Menu`'s stacked `<aside>`s). Full list incl. Início/Parceiros/Inscreva; items with `children` (Sobre, P&D) become accordions.
- **`footerColumns`** (`NavItem[][]`) → the footer's **4-column** "Navegação" grid (Sobre+children · P&D+children · Mídia/Parceiros · Inscreva/Contato; `col-6 col-md-3` nested `.row`), with **Conecte-se + Copyright + "Voltar ao topo" right-aligned** in a sibling `col-lg-4 col-xl-3`. Omits Início; uses the short "TRL" child label vs the menu's fuller one.

`children` subpage arrays (`sobreChildren`/`pdChildren`) are shared by `navLinks`/`headerLinks`. **The header dropdown + chevron, the fs layered-reveal + cascade + accordion, and the +/- toggle/pill mechanics are all in the Menu Signature recipe above** — read it before touching the menu. Subpages that don't exist yet are linked anyway (they 404 until built — same convention as `pages.trl`). Anchors (`#…`) scroll the home via `useAnchorScroll`; routes (`/…`) navigate; the `home` entry navigates home / scrolls to top. When a section becomes a real page flip its entry `#…`→`/…` (done for `/sobre`, `/parceiros`; `#contexto` was **removed**). In-page contact CTAs (Banner/About) point at `/contato`. **`routes.js` is JS but JSDoc-typed** (`@typedef NavItem` with optional `children`/`home`) so components read `item.children` without TS union errors — **keep the `/** @type {NavItem[]} */` annotations** when editing the lists.

## On-page SEO rules

- **Titles <= 60 chars, meta descriptions <= 160.** Both are set twice per route (`metadata` +
  `metadata.openGraph`) - keep them in sync, and remember `pageGraph` reads `metadata.title` /
  `metadata.description`, so fixing the metadata fixes the schema too.
- **Every route needs its own OG image.** They live in `public/img/og/<slug>.jpg` at **1200x630**,
  generated from that page's hero photo with a green-dark scrim plus the `aether-gp` wordmark in
  `green-light`. The scrim strength is tuned per image so the wordmark keeps **>= 4.5:1** contrast
  against the photo behind it - re-check that if you swap an image.
- **`twitter` is set once in the layout and only carries `card: 'summary_large_image'`.** It is
  inherited by every route, so adding a title/description/image there would override each page's own;
  Next fills those from the page's `metadata` + `openGraph`.
- **The `( ... )` eyebrow labels are NOT headings.** They are decorative section labels, so they render
  as `<p>` - the real heading is the adjacent `<h1>`/`AnimatedTitle` (`AnimatedTitle` renders an
  `<h2>`). The exception is a section whose eyebrow is its *only* heading (the legal-page clauses,
  `/contato`, `/inscreva-seu-projeto`, the home `Companies` blocks): there the eyebrow is an `<h2>`.
  Because Tailwind preflight zeroes heading margins and sizes, `<h3>` vs `<p>` vs `<h2>` is visually
  identical here - pick the level by meaning, not by looks.
- **One `<h1>` per route, no skipped levels.** All 15 routes currently validate; re-check after adding
  a section.
- **`alt=''` is only for decorative images** (logo watermarks, icon bullets, empty-state marks) and
  should be paired with `aria-hidden`. Content photography gets real pt-BR alt text - carry it in the
  data object next to the image (see `dimensoes` in `PDDimensoes.tsx`).

## Structured data (JSON-LD)

All schema lives in **`src/utils/schema.ts`**, rendered via **`src/components/JsonLd`**; every node has
a stable `@id` and references others by `@id` rather than repeating them. The layout emits the global
`@graph` (`Organization` + `ResearchOrganization` for ICT AetherBio+ + the founder `Person` +
`WebSite`).

**Every new route must call `pageGraph({ type, path, name, description, trail, extend?, extra? })`** -
it produces the typed WebPage (`AboutPage`/`ContactPage`/`CollectionPage`/`WebPage`) plus its
`BreadcrumbList` in one go. Pass `name: metadata.title as string` and
`description: metadata.description as string` so the schema can never drift from the meta tags; pass
`trail: []` on the home page to skip the pointless single-item breadcrumb. Use `extra` for additional
nodes and `extend` to add `mainEntity` etc. to the page node.

Blog nodes (`blogNode`, `articleNode`) live in `src/app/midia/db/schema.ts`, next to the data source,
so a WordPress swap only has to preserve the `MediaPost` shape.

**Two rules that are easy to get wrong:**
- **`worksFor` is only for Aether's own people.** External researchers shown on a page (e.g. the CQMED
  coordinators on `/pipeline`) take **`affiliation`** - claiming they work for Aether would be a
  factual misstatement.
- **Don't publish contact details.** The client does not want the phone or e-mail public, so
  `Organization` carries a form-only `contactPoint` (`url: /contato`) and a country+region address, no
  street, no `email`, no `telephone`.

Full detail + what's still open: [.claude/NOTES.md](.claude/NOTES.md).

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
- **`FileUpload`** now exists (built for `/inscreva-seu-projeto`). PDF-only ≤15MB by default (`accept`, `maxSizeMB` props). Has two modes: **standard** (registers a `FileList`, form must use `isFormData`) and **`uploadToR2`** (see below). Shows a dashed dropzone → "A enviar arquivo..." during upload → selected filename + size + remove button; `microcopy` prop for the helper line.
- **`uploadToR2` prop on `FileUpload`** — when `true`, the file is uploaded **directly from the browser to Cloudflare R2** via a presigned PUT URL before form submission. Flow: (1) on file select, POST to `/api/r2-presign` with `{ filename, contentType, size }` to get `{ url, key }`; (2) PUT the file directly to the presigned URL (bypasses Vercel entirely); (3) register the R2 object `key` (string) as the field value. The form then submits as **JSON** (no `isFormData` needed) with the key as the field value. The `/api/resend` route detects keys starting with `inscricoes/`, generates a **presigned GET URL valid for 7 days** (SigV4 max), and includes it as a clickable link in the email. Use `uploadToR2` for any file field where the upload could exceed Vercel's ~4.5MB body limit.
- **`Textarea` takes an optional `microcopy`** helper line (rendered under the label).
- **Subject-in-title is done** — `/api/resend` now uses `body.Assunto` in the email subject when present.
- **Multi-step forms:** there's no stepper component — compose one inside the `Form`. A child component under the `FormProvider` holds `useState(step)` and calls `useFormContext().trigger([fieldNames])` to validate the current step before advancing; render steps conditionally — RHF keeps values across step changes (no `shouldUnregister`). "Continuar"/"Voltar" are `Button type='button'`; only the final `Submit` posts. **Animate the swap with the CSS keyframe `.fade-step-in`** (`animations.pcss`) on a wrapper keyed `key={step}` so it replays on mount — **do not gate the `setStep` state change on a GSAP `onComplete`**: rAF gets throttled (background tab / reduced motion) and can strand the transition or leave content stuck at `opacity:0`. The step swap changes page height, so **`ScrollTrigger.refresh()` after it settles** (a `setTimeout(…, 450)` keyed on `step`) to keep the footer reveal + stroke triggers accurate (the `#viewport` wheel handler already reads `scrollHeight` live, so scrolling itself stays correct). See `src/app/inscreva-seu-projeto/ProjectForm.tsx`.
- **Browser autofill** light-blue/yellow background is killed globally in `globals.pcss` (`:-webkit-autofill` → `-webkit-text-fill-color` + a 9999s background transition), so autofilled inputs keep the transparent field styling. No per-field work needed.

### The email route (`src/app/api/resend/route.ts`)

POST handler: requires `body.Email`; `b_website` is a honeypot (silently 200s if filled — renamed from `company` because password managers auto-filled that name); `form` + `b_website` are excluded from the body; destination is hard-coded in `getDestinationEmail()`. It **accepts both JSON and `multipart/form-data`** (branches on `content-type`): multipart requests have their `File` pulled out and sent as a **Resend attachment** (server-side re-validates PDF + 15MB, 400s otherwise). When `body.form === 'inscricao'` it (a) titles the email "Nova inscrição de projeto - {Nome}" and (b) sends a **second confirmation e-mail to the proponent** (`body.Email`), best-effort (a bounce doesn't fail the submission). Other forms keep the old single-email behaviour. **R2 document link:** when `body.Documento` is a string starting with `inscricoes/` (set by `FileUpload uploadToR2`), the route generates a **presigned GET URL (7-day max, SigV4 limit)** via `@aws-sdk/s3-request-presigner` and includes it as a clickable link row in the email HTML - the field is excluded from the key-value table so it doesn't appear as raw text. **`from` address:** must be on a **Resend-verified domain** (currently `aethergp.com.br`). For local testing without a verified domain, use `onboarding@resend.dev` as the `from` and send only to the Resend account email - Resend blocks sending to other addresses without a verified domain.

### Modals (`Dialog` + `Portal`)

Success/error feedback renders through `Modal` → `Dialog` (`@/components/Dialog`) inside a `Portal` (into `#portal`). `Dialog` uses a native `<dialog>` opened with `showModal()`; it adds `no-scroll` to `<body>` while open, closes on backdrop click / `Escape` / any `[data-dialog-close]` element, and can also be opened by any `[data-dialog]` element whose `href="#id"` points at it. Reuse this for any modal, not just form feedback.

## Images

`next/image` optimization is **on** (AVIF/WebP + srcset; the `src/components/Image` wrapper defaults `quality` to 75 - never raise it to 100). Source images are kept **≤2560px on the long edge** and compressed; don't commit multi-MB originals. The only remote host is the headless WordPress backend `wp.aethergp.com.br` (`graphql-request` is a dependency for future CMS data; not yet wired into built pages). Use the local `src/components/Image` wrapper for project images.
