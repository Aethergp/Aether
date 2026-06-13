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

## Animations (GSAP)

GSAP is the **only** animation engine — `motion` is in `package.json` but unused. Plugins in play: **ScrollTrigger** and **SplitText**, registered at the top of each component that uses them (`gsap.registerPlugin(...)`). Everything runs through `@gsap/react`'s **`useGSAP`** (scoped, auto-cleans tweens/triggers on unmount). For the *design intent* of each effect (when to reach for which), see [.claude/ART-DIRECTION.md](.claude/ART-DIRECTION.md) → Motion. This section is the mechanics.

### Six universal rules (every effect obeys these)

1. **`scroller: document.getElementById('viewport')` on every ScrollTrigger** — the page scrolls a `#viewport` div, not the window. Omit it and the trigger silently never fires.
2. **`await document.fonts.ready` before any `SplitText`** — otherwise lines are split against the fallback font and re-wrap when the webfont loads.
3. **Reveal once by default** (`once: true` / `toggleActions: 'play none none none'`). The `Stagger*` components and `AnimatedText` take an `infinite` prop to re-animate on scroll-back.
4. **Register triggers inside component `useGSAP`/effects, never globally** — `PageTransition` kills all ScrollTriggers on route leave and `ScrollTrigger.refresh(true)` on enter; only per-component triggers get rebuilt.
5. **The hero waits for the preloader `init` event** — gate intro animations on `window.addEventListener('init', …, { once: true })`, not on mount.
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

- **SVG path draw-on-scroll** (the recurring green stroke — Context, Companies, Contact): `const len = path.getTotalLength()` → `gsap.set(path,{strokeDasharray:len})` → `fromTo(path,{strokeDashoffset:len},{strokeDashoffset:0, ease:'none', scrollTrigger:{ scroller:#viewport, scrub:1.5, start:'10% 80%', end:'50% 20%', refreshPriority:-1 }})`.
- **Pinned hero background** (`Banner`): the `[data-bg]` video is pinned (`pin`, `pinType:'fixed'`, `anticipatePin:1`) and `opacity`/`scale` scrubbed `top top`→`bottom top`; the `<h1>` is `SplitText` chars hidden at `y:110%`, released by the `init` listener with `back.out(1.7)`.
- **Footer reveal** (`src/components/Footer`): the footer is `position:sticky bottom-0 z-0 min-h-lvh` sitting **behind** `<main>` (`relative z-1`); the `<aside data-footer-spacer>` inside `<main>` is the trigger (`start:'top bottom'`, `end:'bottom 10%'`). As it enters: the giant wordmark letters (`[data-logo-footer] path`) rise `y:50vh`→`0` + `scale:0`→`1`, stagger `.05`, `scrub:3`; the black `[data-footer-shadow]` overlay fades `opacity`→`0`, `scrub:2` — the logo lifts out of darkness. "Voltar ao topo" animates `#viewport` scrollTop to 0.

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

### Adding controls that don't exist yet (`Select`, file upload)

There is **no `Select` and no file-input component** — upcoming pages need them (`/contato` subject selector; `/inscreva-seu-projeto` PDF upload). Build them *in `Form/index.tsx`, mirroring `Input`*: register via `useFormContext()`, reuse the wrapper (`data-form-line`, `mb-2 sm:mb-4`), the `Label`, the field styling (`border border-gray-lighter bg-transparent rounded-md p-4`), and the red error-badge pattern. For a select use `appearance-none` + a positioned chevron; name it `Assunto` so it lands in the email.

**Two route changes these will force** (the current route only emails key/value text):
- **Subject in the email title** — `/api/resend` hardcodes the subject string; route the `Assunto` value into it if triage-by-subject is wanted.
- **File attachments** — `isFormData` is supported client-side, but the route does **not** attach files; extend it (Resend `attachments`, or upload to storage and link) before wiring a real upload.

### The email route (`src/app/api/resend/route.ts`)

POST handler: serializes submitted fields into an HTML table and sends via Resend (`RESEND_API_KEY` required at module load). Requires `body.Email`; `company` is a honeypot (silently 200s if filled); `form` + `company` are excluded from the body. Destination is hard-coded in `getDestinationEmail()`.

### Modals (`Dialog` + `Portal`)

Success/error feedback renders through `Modal` → `Dialog` (`@/components/Dialog`) inside a `Portal` (into `#portal`). `Dialog` uses a native `<dialog>` opened with `showModal()`; it adds `no-scroll` to `<body>` while open, closes on backdrop click / `Escape` / any `[data-dialog-close]` element, and can also be opened by any `[data-dialog]` element whose `href="#id"` points at it. Reuse this for any modal, not just form feedback.

## Images

`next/image` is set to `unoptimized: true` with the only remote host being the headless WordPress backend `wp.aethergp.com.br` (`graphql-request` is a dependency for future CMS data; not yet wired into built pages). Use the local `src/components/Image` wrapper for project images.
