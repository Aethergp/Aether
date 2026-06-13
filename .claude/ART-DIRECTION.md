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

**Motion is what gives this site life — it is not optional polish.** The reveals, the parallax, the
hover states, and above all **the green line drawing itself along its path as you scroll** are the
identity of the brand. A page that renders everything static, however well-composed, has lost the
thing that makes it Aether. Every new page must carry this animation layer from the first build, not
bolt it on later — that is the entire reason this playbook maps each effect and when to use it.

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

**The pairing is deliberate — don't swap the roles.** Inter (neutral, structural) does the headlines so
they read clean and institutional at large sizes; Syne (a touch more characterful) carries the running
text. Headlines stay tight-leading (`text-72`/`text-60` ship with `leading-[1.1]`); body stays
`leading-relaxed`. Weights: `font-bold` is hero-only, `font-semibold` for section titles and eyebrows,
`font-normal` for body. Don't reach past `700`.

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

**Canonical pairings** (stay on these — they're what the home page uses):

- `white` canvas → `green-dark` text, `green-pale` cards/pills, `green-light` for the decorative stroke.
- `green-dark` surface (hero, footer) → `green-light` text/marks, `green-light`/`black` button states.
- `green-pale` card → `green-dark` text, an oversized `green-light` number as the accent.
- `pure-white` cell (logo grid) → monochrome logo (`brightness-0`), `gray-lighter/25` border → `green-dark` on hover.

## Depth & layering

Sections read rich because something lives behind the content — never a flat fill.

- **The signature: a giant curved green stroke** that draws itself along its path as you scroll — the
  single most important motion in the system and the brand's through-line. An absolutely-positioned
  `<svg>` (`stroke='#E0E6A1'`, `strokeWidth='100'`) sits behind the content at low/negative z, and its
  `strokeDashoffset` animates from full length to 0 tied to scroll (`scrub`). It recurs across Context,
  Companies, and Contact today, and **essentially every page should carry at least one** — it's what
  threads the site together and makes it feel alive. Vary the path shape, scale, and placement per
  page/section so it never feels copy-pasted; **keep the weight, the `green-light` color, and the
  draw-on-scroll behaviour constant.** Never ship a page without it unless there's a deliberate reason.
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
| `FollowMouse` | Drag-circle cursor follower inside a region (desktop only) | Draggable galleries / showcases |
| `Video` | Plays/pauses as it scrolls in/out of view | Inline supporting video |
| `Marquee` | Seamless infinite logo strip (`reverse` to flip) | Trusted-by / partner logo bands |

**When to reach for which:** titles always get `AnimatedTitle` (the fill is the section's "arrival"); a
title's lead/eyebrow and body paragraphs get `AnimatedText` (or `TextReveal` for a heavier statement
line); grouped items (pills, cards, logos) get a `Stagger*` so they cascade rather than pop; a single
big editorial image gets `ScrollingImage` parallax or an `ImageReveal` wipe — not both. Use one hero
moment per section, not five competing ones. Decoration (the green stroke) draws; content reveals;
nothing blocks reading.

**The footer is a designed moment, not a sign-off.** It's a `green-dark` panel that sits *behind* the
page (`position: sticky`) and is uncovered as you reach the bottom: the giant Aether wordmark's letters
rise and scale into place (staggered, scrubbed) while a black overlay fades off so the mark lifts out of
darkness. Treat the bottom of every page as part of the experience — full-height, branded, with the
wordmark reveal intact. (Mechanics in [../CLAUDE.md](../CLAUDE.md) → Animations → Footer reveal.)

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

## Hover & interaction states

Interactive things must *feel* interactive, in the same quiet register. The established vocabulary —
reuse it rather than inventing new hovers:

- **Buttons** invert: the text segment goes `bg-black text-green-light` and the icon does a scale-flip
  swap (`transition-colors`/`transition-all duration-200`). This black-invert is *the* button motion —
  use the `Button` component and you get it for free.
- **Text links** use one of two underline treatments (both in `buttons.pcss`): `hover-underline`
  (a current-color underline that **grows** left→right via `bg-size`) and `hover-underline-alt` (a line
  that **sweeps** across); on dark surfaces add `hover-underline-alt--light`. Footer nav uses these.
- **Cards / cells** respond on hover: the partner grid cell shifts its border to `green-dark` and lifts
  its logo from `opacity-75` to `100`; surfaces transition over `duration-200`. Never leave a card inert.
- **The menu** hamburger lines spread apart on hover (`group-hover:translate-y`), the button darkens to
  black, and full-screen menu links nudge right (`hover:translate-x-2`).
- **Magnetic affordance:** wrap the logo and primary buttons in `MagneticButton` so they lean toward the
  cursor on desktop. Reserve it for a few key elements — it's a spotlight, not a default.
- Keep durations consistent within a section (200ms for color/UI swaps, longer for magnetic/elastic
  motion). Always pair hover with `cursor-pointer`, and rely on the global `focus-visible` outline
  (`globals.pcss`) for keyboard users — don't strip it.

## Responsiveness & cross-device

Design desktop-first to the largest breakpoint, then deliberately calm everything down on smaller
screens — mobile gets the *legible* version of each effect, never a shrunken desktop one. The site is
verified across **desktop, tablet, and mobile**; a section isn't done until all three hold.

- **Breakpoints** (Bootstrap-matched, in `@theme`): `xs 420 / sm 576 / md 768 / lg 992 / xl 1200 /
  2xl 1400`. Grid rows stack on mobile (`max-lg:flex-col`); columns rejoin at `lg`. Type uses the
  responsive `.text-*` clamps; fluid `vw` spacing only kicks in at `lg+`.
- **Motion degrades on mobile by design:** smooth scroll, magnetic buttons, and the follow-mouse circle
  are **desktop-only**; parallax offsets shrink. Don't build a mobile layout that *depends* on a
  desktop-only effect to make sense.
- **Full-height blocks use `--vh`, not `100vh`.** A `ViewportHeight` helper writes the real visible
  height into `--vh` (handling the iOS URL bar); use `h-[calc(var(--vh)*100)]` / `h-svh` / `min-h-lvh`
  for anything full-screen, so nothing gets clipped behind mobile browser chrome.
- **Watch the seams when several scroll effects share a page** — pinned/scrubbed reveals and the
  draw-on-scroll strokes must release cleanly and not overlap. This is the most common cross-device
  break; the mechanics (`refreshPriority`, refresh-after-pin) are in [../CLAUDE.md](../CLAUDE.md) →
  Animations. There is currently **no `prefers-reduced-motion` path** — worth adding if accessibility
  is in scope, but don't assume it's there.

## Sliders (Swiper)

Swiper is the house slider. The established pattern is a **peek/free scroller**: many cards, the next
one peeking past the container edge to invite dragging. Let the slider overflow visibly
(`className='overflow-visible!'`) while a parent clips it; size slides with `slidesPerView` +
`breakpoints` (e.g. `1.1 → 2 → 3 → 4`), `freeMode`, `mousewheel.forceToAxis`, and a draggable
`scrollbar` (styled green-dark in `globals.pcss`). Don't hardcode slide widths. See the Context section's
items slider for the reference setup.

## Forms

**Always compose forms from the `Form` family** in `@/components/Form` — never hand-roll `<form>`,
`<input>`, or a fetch handler. The family (built on `react-hook-form`) gives you validation, the
sending/spinner state, and the success/error modal for free. Full mechanics + the field-name→email
mapping are in [../CLAUDE.md](../CLAUDE.md) → Forms; the rules here are how a form should look and behave.

**Pick the control for the job:**

- **`Input`** — single-line answers (`text`, `email`, `tel`, `password`). One field = one question.
- **`Textarea`** — open/long answers (the message, a project description).
- **`Checkbox` (`type='checkbox'`)** — a single opt-in (e.g. the confidentiality acknowledgement). It
  accepts rich `children`, so the label can carry a link.
- **`Checkbox` (`type='radio'`)** — a small, mutually-exclusive set you want fully visible.
- **`Select`** — *doesn't exist yet*; build it for a longer option list (the `/contato` subject
  selector). See the construction note below — match `Input` exactly so the form reads as one system.
- **`Submit`** — the only submit control; pass `style='dark'`, it carries the spinner state.

**Layout & rhythm:** one field per row, stacked with the field's own bottom margin (`mb-2 sm:mb-4`);
forms sit in a grid column (`col-lg-6`) opposite a parenthetical eyebrow (`(contato)`), matching every
other section. Keep the contact form short — name, email, message — and let a dedicated page
(`/inscreva-seu-projeto`) carry the long multi-step form.

**Labels, required & errors:** every field gets a `Label`; required fields show a red `*`; validation
errors render as a **small red badge** pinned to the field plus a red border on the control — never an
alert box or a wall of text. All copy is **Portuguese (pt-BR)** — labels, placeholders, validation
messages, and the success/error modal `{title, text}`.

**Field styling** (match it when building new controls): `border border-gray-lighter bg-transparent
rounded-md p-4`, `placeholder:opacity-75`, focus uses the global `focus-visible` outline. A **`Select`**
should reuse this exact treatment with `appearance-none` + a positioned chevron icon so it doesn't look
like a native dropdown.

**Confidentiality / helper notes** (required by the project-submission spec): place the note *next to*
the form as visible copy — and/or as a `Checkbox` the user must tick — not buried in fine print.

**Submission feel:** on submit the button swaps its icon for a spinner; on success a centered `Dialog`
modal (white card, rotating close ✕, dimmed backdrop) confirms in plain pt-BR and the form clears.
Don't redirect or inline a status message — the modal *is* the confirmation pattern. Reuse the same
`Dialog` for any other modal need.

**Spam:** the route requires a field literally named `Email` and treats `company` as a honeypot. Tag
the source with `<InputHidden name='form' value='...' />`; add an off-screen `company` field to arm the
honeypot. Name every other field with the human-readable label you want in the internal email
(`Nome`, `Assunto`, `Mensagem`).

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

## Carrying the system to new pages

This playbook exists so every new page feels as alive as the home page — same identity, fresh layout.
When building one, treat this as the floor (not the ceiling):

1. **At least one green draw-on-scroll line**, shaped and placed for that page's composition.
2. **Titles fill in** (`AnimatedTitle`), **eyebrows/leads/body rise** (`AnimatedText`/`TextReveal`) —
   no headline or paragraph lands statically.
3. **Grouped content cascades** (`Stagger*`); at least one **media moment** (parallax `ScrollingImage`
   or `ImageReveal` wipe), used once, not stacked.
4. **Hover states on everything interactive** (buttons invert, links underline, cards respond).
5. **The footer reveal stays intact** — the wordmark rise is part of every page's ending.
6. **Editorial grid, not centered blocks** — asymmetry via offsets/spacer columns.
7. **Verified on desktop / tablet / mobile**, with the device gates respected and scroll seams clean.

Reuse the existing components and recipes first; only write new GSAP when the page genuinely needs a
move the library doesn't cover — and when you do, obey the same rules (`#viewport` scroller,
`fonts.ready`, reveal-once, `refreshPriority`). New shared moves get added to the library, not copied.

## Anti-patterns

- A page with no green line and no scroll reveals — static is a regression, however clean the layout.
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
