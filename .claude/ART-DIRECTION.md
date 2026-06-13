# Art Direction & Design Language

The *feeling* we're aiming for, plus the concrete building blocks this site is made of. Read this
before designing a new section or page, then make choices that fit the sensibility. The home page
(`src/app/home/*`) is the reference build — when in doubt, open a section there and match how it's
composed. Implementation mechanics (smooth scroll, page transitions, the preloader `init` event, SVG
imports) live in [../CLAUDE.md](../CLAUDE.md); this file is about *how it should look and feel*.

## The feeling

Calm, scientific, editorial, premium. This is a pharmaceutical/biotech holding — the tone is
**considered and institutional, never loud**. Confidence comes from restraint: large quiet headlines,
generous whitespace, an asymmetric editorial grid, a tight olive-green palette, and motion that
reveals content gracefully as you arrive at it. Sections breathe (vertical rhythm scales up to `10vw`
of air); type fills in and rises into place rather than flashing; a single oversized curved green
stroke drifts behind the content as the one recurring "brand gesture". When in doubt: more space,
fewer elements, a bigger but quieter headline, and let the motion do the talking.

The floor we're climbing away from: a flat white block with a centered black title and a bulleted
list. Everything here is off-center, green-on-warm-white, and animated in.

## Layout & grid

The site is built on a **Bootstrap-style 12-column grid**, not raw Tailwind flex/grid, for the
editorial asymmetry that defines the look.

- **Container:** wrap section content in `.base-container` (≈1620px max, responsive side gutters from
  `1.5rem` up to `8rem`). Never add a `max-w-*` next to it — it owns the width.
- **Rows & columns:** `<div className='row'>` with `col-lg-*` children (`576 / 768 / 992 / 1200`
  breakpoints — `sm / md / lg / xl`, matching the `@theme` tokens). Stack on mobile with
  `max-lg:flex max-lg:flex-col max-lg:gap-10`.
- **Asymmetry is the point.** Indent content with empty spacer columns (`<div className='col-lg-3' />`)
  and `offset-*` / `col-*-push-*` / `col-*-pull-*`. Signature moves from the home page:
  `col-lg-8 col-lg-push-2` (centered-but-indented title), an empty `col-lg-3` left margin with the
  eyebrow in the next `col-lg-3` and the body in `col-lg-6`. Titles rarely start at the hard left edge.
- **Fluid rhythm at scale.** Large-breakpoint spacing uses viewport units, not fixed steps —
  `lg:my-[10vw]`, `lg:pt-[7vw]`, `min-h-[120vh]`. Body type itself goes fluid at `2xl` (`text-[.9vw]`).
  Match this: scale spacing and oversized media in `vw` on `lg+`, fixed `spacing` steps below.

## Type

Two faces, loaded via `next/font` and exposed as Tailwind utilities. **Note the inversion** (it's a
common trip-up): `font-heading` is **Inter**, `font-body` is **Syne**.

- **`font-heading` (Inter)** — every title and headline, plus the parenthetical eyebrows. Always
  paired with `font-semibold` for section titles, `font-bold` for the hero. Inter is the display face
  here; it carries the headlines.
- **`font-body` (Syne)** — body copy. It's the default on `<body>` (`text-green-dark`, `leading-relaxed`,
  `tracking-tight`) so you rarely set it explicitly.

**Use the custom `.text-*` scale, not raw `text-xl`/`text-4xl`** — they're responsive clamps defined in
`typography.pcss` and keep type consistent across breakpoints:

| Class | Role |
|---|---|
| `text-72` | Hero `h1` only (`font-heading font-bold`) |
| `text-60` | Section titles — the workhorse `h2` (`font-heading font-semibold`) |
| `text-36` | Modal / dialog titles |
| `text-30` | Card titles |
| `text-24` / `text-20` | Lead paragraphs, emphasized intro copy |
| `text-18` / `text-16` | Body copy |

**The section header pattern** (reuse it for rhythm): a parenthetical lowercase **eyebrow** —
`<h3 className='font-semibold font-heading'><AnimatedText text='(o contexto)' /></h3>` — paired with a
`text-60` title and a `text-20` lead paragraph, laid across the grid (eyebrow in a narrow column, body
in a wider one). Eyebrows are always written in parentheses: `(o contexto)`, `(arquitetura da
plataforma)`, `(principais funções)`, `(contato)`. A title rarely stands alone — give it a lead line.

Headlines are **two-tone and fill in on scroll** — see the `AnimatedTitle` component under Motion.

## Color

Tight olive-green palette on a warm off-white canvas. **Always use the project tokens** (`green-dark`,
`green-pale`, `green-light`, the `gray-*` ramp) — never Tailwind's default `gray-*` or a raw black.

- **`green-dark` `#555328`** — the primary. Default text color, dark section backgrounds, button fills,
  the icon marks on pills.
- **`green-pale` `#D3D4AB`** — quiet surfaces: cards, pill rows. The "designed background" for grouped info.
- **`green-light` `#E0E6A1`** — the accent. Text/logos on dark green backgrounds, oversized faint
  numbers on cards, the decorative SVG strokes, the open-menu panel.
- **Neutrals:** page background is `white` (`#fffcf9`, warm — not pure white); `pure-white` exists for
  true white cells (the partner grid). `black` is `#1d1d1b`; reserve `pure-black` for the menu overlay.
  Structure/borders use the `gray-lighter`/`gray-light` ramp, usually at low opacity (`border-gray-lighter/25`).
- **Inversion rule:** on a `green-dark` surface, text and marks become `green-light`. The hero is the
  canonical example (`bg-green-dark` + `text-green-light`).

Alternate the canvas so adjacent sections don't blur: most sections sit on the warm white, the hero is
deep green, cards/pill groups are `green-pale`. Reserve `green-light` as a spotlight, not a fill.

## Depth & layering

Sections read rich because something lives behind the content — never a flat fill.

- **The signature: a giant curved green stroke** drawn on scroll. An absolutely-positioned `<svg>`
  (`stroke='#E0E6A1'`, `strokeWidth='100'`) sits behind the section at low/negative z, and its
  `strokeDashoffset` animates from full length to 0 tied to scroll (`scrub`). This single gesture
  recurs across Context, Companies, and Contact — it's the brand's visual thread. Vary the path shape
  and placement per section; keep the weight and color.
- **Tinted video** for the hero only: muted/looping/`playsInline`, with a `from-green-dark/75` gradient
  over it so it reads as brand surface, and a slow scale-in/fade tied to a pinned ScrollTrigger.
- **Parallax media** via `ScrollingImage` — the image is taller than its frame and drifts as you scroll
  (the About microscope). Let media bleed past its container (`min-h-[120vh]`, `rounded-sm`).

Standard scaffold: positioned section (`relative overflow-hidden`), decoration pinned behind
(`absolute`, low/negative z), content floated above (`relative z-2`). Decoration serves the content —
don't add it just to decorate.

## Shape & form

- **Rounded, soft, contained.** `rounded-sm` to `rounded-md` (cards step up at `lg`:
  `rounded-sm lg:rounded-md`); generous internal padding (`p-8`, `px-6 py-4`).
- **Pills, not bullets.** Grouped information renders as `green-pale` rows
  (`flex items-center gap-3 bg-green-pale px-6 py-4 rounded-sm`), each led by a small brand icon mark —
  never a plain `<ul>` with bullets. This is the "principais funções" pattern; wrap the group in
  `StaggerUp`.
- **Cards** (`green-pale`, rounded, `p-8`): an oversized faint number set in `green-light`
  (`text-7xl sm:text-8xl lg:text-9xl font-heading font-bold`), a `text-30` title, `text-18` body.
- **Logo / partner grid:** square `pure-white` cells, `border-gray-lighter/25`, logos forced monochrome
  (`brightness-0 opacity-75`); on hover the border goes `green-dark` and the logo to full opacity. Wrap
  in `StaggerScale`.
- **Icons** are local SVGs imported as React components (`@/assets/svg/...`), colored via `text-current`.

## Buttons & CTAs

Use the **`Button` component** (`@/components/Button`) for every CTA — don't hand-roll buttons.

- Props: `style: 'light' | 'dark'`, `text`, optional `icon: 'diagonal-arrow' | 'close'`. With `href` it
  renders as a `next-transition-router` `Link` (so page transitions fire); without, a `<button>`.
- **Two-segment design:** a text pill + a separate icon pill (`gap-px`), both `rounded-md`. On hover the
  text segment inverts to `bg-black text-green-light` and the icon does a scale-flip swap — a small,
  deliberate micro-interaction. `dark` = green-dark on green-light; `light` = green-light on green-dark;
  both go black on hover.
- For in-page anchors, pair it with the `useAnchorScroll` hook (`onClick={(e) => scrollTo(e, '#id')}`)
  so it animates `#viewport` rather than jumping. For forms use `Submit` (shows a spinner while sending).
- Wrap prominent buttons/logos in `MagneticButton` for the desktop magnetic-hover follow (the menu and
  header logo do this).

## Motion & interactivity

GSAP is the animation engine (ScrollTrigger + SplitText + `useGSAP`). Substantial content earns a
choreographed reveal — but in this project's restrained register: titles fill/rise, body rises by
character, groups stagger, decoration draws and parallaxes. Don't reinvent these — **compose the
existing reusable components** (`src/components/Utils/Animations/`):

| Component | What it does | Use for |
|---|---|---|
| `AnimatedTitle` | Line-by-line two-tone gradient **fill** on scroll-scrub (`fill-title`, `style='light'\|'dark'`) | Section titles (`h2`) |
| `AnimatedText` | Char-by-char **rise** (`y:110%`); accepts an HTML `text` string with `<strong>`/`<br>` | Eyebrows, lead & body copy |
| `TextReveal` | Per-line colored **block-wipe** reveal (`blockColor`, optional pinned `scrub` + `pinSection`) | Statement lines, hero supporting copy |
| `StaggerUp` | Children rise + fade, staggered | Pill rows, lists |
| `StaggerScale` | Children scale 0→1, staggered | Logo / card grids |
| `StaggerOpacity` | Children fade in, staggered | Quiet groups |
| `Counter` | Count-up to a number, `pt-BR` formatted | Stats |
| `ImageReveal` | Clip-wipe + scale-in reveal (`overlay` tint) | Featured images |
| `ScrollingImage` | Vertical **parallax** (image taller than frame) | Two-column media |
| `MagneticButton` | Magnetic cursor-follow (desktop only) | Logos, key buttons |

**Hard rules for any custom GSAP you do write** (the reusable components already obey these):

1. **Every ScrollTrigger must set `scroller: document.getElementById('viewport')`.** The page scrolls a
   `#viewport` div, not the window — a trigger without this never fires. (See [../CLAUDE.md](../CLAUDE.md).)
2. **`await document.fonts.ready` before `SplitText`**, so lines are measured against the real webfont.
3. **Reveal once by default** (`once: true` / `toggleActions: 'play none none none'`); pass `infinite`
   on the stagger components only when an element should re-animate on scroll-back.
4. **Register triggers inside component `useGSAP`/effects**, not globally — page transitions kill and
   rebuild all ScrollTriggers on navigation, and only per-component triggers get rebuilt.
5. The hero's intro waits for the global **`init` event** the `Preloader` dispatches — gate any
   "after preloader" animation on it, don't run it on mount.

Easing leans on `power2`/`power4.inOut` and `circ.out`; durations are unhurried. Motion leads the eye
in reading order and never blocks the content.

## Sliders (Swiper)

Swiper is the house slider. The established pattern is a **peek/free scroller**: many cards, the next
one peeking past the container edge to invite dragging. Let the slider overflow visibly
(`className='overflow-visible!'`) while a parent clips it; size slides with `slidesPerView` +
`breakpoints` (e.g. `1.1 → 2 → 3 → 4`), `freeMode`, `mousewheel.forceToAxis`, and a draggable
`scrollbar` (styled green-dark in `globals.pcss`). Don't hardcode slide widths. See the Context section's
items slider for the reference setup.

## Forms

Use the **`Form` family** from `@/components/Form` (`Form`, `Input`, `Textarea`, `Checkbox`,
`InputHidden`, `Submit`) — built on `react-hook-form`. The `Form` POSTs to its `endpoint` (e.g.
`/api/resend`) and renders a success/error **`Dialog` modal** (via `Portal`) from the `onSuccess` /
`onError` `{title, text}` props; `clearOnSubmit` resets on success.

- All copy is **Portuguese (pt-BR)** — labels, validation messages, modal text.
- Inputs: `border border-gray-lighter bg-transparent rounded-md p-4`; errors show a red border + a tiny
  red message badge.
- **Spam:** the `/api/resend` route treats a `company` field as a honeypot and requires an `Email`
  field. Include `<InputHidden name='form' value='...' />` to tag the source; add an off-screen
  `company` field if you want the honeypot.

## Vertical rhythm & section anatomy

- **Consistent section spacing**, scaling up by breakpoint and going fluid at `lg`:
  `py-20 lg:py-[10vw]` or `my-20 md:my-30 lg:my-[10vw]`. Keep the scale uniform so the page feels like
  one system.
- **Every section gets a stable `id`** (`#contexto`, `#sobre`, `#arquitetura`, `#parceiros`, `#contato`)
  — the menu and in-page CTAs scroll to these via `useAnchorScroll`. New sections that should be
  navigable need an `id` and a matching menu entry.
- **Anatomy:** `<section id>` → `.base-container` → `.row` → grid columns. Header block = eyebrow
  `(label)` + `text-60` title + `text-20` lead, spread across the grid with deliberate asymmetry.

## Conventions

- **Indent with tabs** (width 4) — matches the existing source.
- **`'use client'`** at the top of any component using GSAP, hooks, or browser APIs.
- Import SVGs as components from `@/assets/svg/...`; use the `@/` path alias throughout.
- Compose `clsx` for conditional classes (the `style`/variant pattern the components use).

## Anti-patterns

- Flat white sections with a centered black title — no depth layer, no asymmetry.
- Pure black text or default Tailwind `gray-*` instead of `green-dark` and the project tokens.
- Centered, symmetric layouts that ignore the 12-column grid and its offsets/spacers.
- Plain bulleted `<ul>` lists where `green-pale` pill rows belong.
- A title with no eyebrow and no supporting line.
- Hand-rolled buttons instead of the `Button` component; raw `<a href="#...">` jumps instead of
  `useAnchorScroll`.
- Custom GSAP that forgets `scroller: #viewport` (silently never fires) or splits text before
  `document.fonts.ready`.
- Re-implementing a reveal that `AnimatedTitle` / `AnimatedText` / `TextReveal` / the `Stagger*`
  components already provide.
- Fixed `px` spacing on large breakpoints where the rest of the page breathes in `vw`.
