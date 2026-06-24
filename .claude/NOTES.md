# Working Notes

Shared, point-in-time status for the Aether build. Durable conventions live in [../CLAUDE.md](../CLAUDE.md);
design language in [ART-DIRECTION.md](ART-DIRECTION.md). **This file is git-tracked — keep it current as
pages land and pendings resolve.**

---

## Phase

The live single home page was a **placeholder launch** (something to show clients). We are now building
the **full, SEO-focused, multi-page site** from the `_docs/` content specs, on the same design + motion
system. Home itself will be re-scoped from "the whole site" into a **distributor** that teases each
section and links to the new internal pages (`_docs/spec-home.md`).

## Content sources in `_docs/`

- **`spec-indice-geral.md`** — the page index + per-page status (the map; read it first).
- **`spec-*.md`** — current authoritative content specs (post-11/06 decisions).
- **`pd/pagina.md`, `pd/trl/pagina.md`, `sobre/pagina.md`** — older "delivered" content, still the
  source for those pages (richer; `sobre/pagina.md` overlaps `spec-sobre.md` — reconcile when building).
- **`textos-institucionais.md`** — client-written institutional copy (platform overview / AGP holding /
  ICT / committee / positioning). **Usable directly** on `/sobre` and the entity pages — not placeholder.
- **`original/*.pdf`** — brand manual, AGP + Bio+ identity, visual/photographic direction; plus 4 stock
  reference photos. **Source of truth for palette, type, and photo direction** — see palette note below.

## Route map

| Route | Content source | Status / what's missing |
|---|---|---|
| `/` (home, re-scope) | `spec-home.md` | Content ready (condense current). Pending: approve hero CTA → `/sobre`; new title/meta; keep banner video? |
| `/sobre` (hub) | `spec-sobre.md` + `sobre/pagina.md` | ✅ **Built** (`src/app/sobre/page.tsx`). **Hero = a 100vh animated WebGL green `<Grainient />` gradient** (see cross-cutting note) - NO eyebrow, NO image, NO `StrokePath` (client cut the top green line - "on too many pages"); the H1 "Inovação, Espiritualidade, Ousadia." sits in the **bottom-left corner** (home-Banner style, `flex justify-end h-svh`, `text-green-light`). **The same Grainient bg spans the hero AND the two manifesto paragraphs AND the DARK `valores` section as ONE continuous field** (one `relative` section: `<Grainient>` at `z-0`, a single uniform `bg-green-dark/35` tint at `z-1` for text legibility, content at `z-2`). **No per-block scrim** - a hero-only bottom scrim was removed because its edge made a visible seam at the hero→valores boundary; legibility comes from the uniform tint instead. Grainient palette = green tokens (`#E0E6A1`/`#555328`/`#23230F`), `noiseScale={4}` (fine grain), `timeSpeed={0.2}`. The manifesto/essence paragraphs sit **below** the 100vh; the 3 valores cards are translucent (`bg-green-dark/30 backdrop-blur-sm border-green-light/20`) so the gradient shows through. After valores the page returns to white. **`/sobre` IS in `Menu` `darkHeader`** now (dark hero → green-light logo). Then: **reuses home `<Context />`** with **`showCreation={false}`** (drops the pinned "A Aether foi criada..." statement - client didn't want it duplicated from home; prop defaults true so home is unchanged) → "a plataforma" 2 pillar cards: **AGP** = `green-dark`, icon recolored to `green-light` via a **CSS `mask-image`** span (not `<Image>`, so any token color works); **Bio+** = the **ICT palette** (`bg-linear-to-br from-ict-safira to-ict-azul`, `text-white`, white-masked icon) - new `--color-ict-safira #01083A` / `--color-ict-azul #323F70` tokens in `theme.pcss` (the manual's Bio+ complementary palette). Both → `pages.sobreAgp`/`sobreIct` (**404 until built**) → **`Timeline` component** (`src/app/sobre/Timeline.tsx`, `'use client'`): a vertical line that **paints `green-dark` top→bottom on scroll** (scrubbed `scaleY` fill over a faint track); **a single scrubbed ScrollTrigger's `onUpdate` drives BOTH the fill and the node lighting from the same `progress`** - each circle flips to `green-light` + glow the moment the painted fill height (`root.offsetHeight * progress`) passes that node's center, so the dots light exactly when the line reaches them (don't split this back into per-node triggers - that lagged behind the line). 8 marks (2000/2025/2026 real; **2005/2009/2013/2017/2021 are lorem-ipsum PLACEHOLDER** years+text to align w/ client) → equipe teaser w/ `scientists.jpg` (`pages.sobreEquipe`, **404 until built**) → Brasil/Canadá presença → dual CTA box w/ faint `abstract.jpg` scrim. H1 + dark-section titles use `AnimatedText`, **not** `AnimatedTitle`/`TextReveal` (3-word H1 wraps on mobile = space-loss gotcha; `AnimatedTitle style='light'` unfilled tone is invisible on dark). Dark pillar card needs `brightness-0 invert` on the GP icon. `navLinks`+`headerLinks` "Sobre" flipped `#sobre` → `pages.sobre`; new `pages.sobre`/`sobreAgp`/`sobreIct`/`sobreEquipe` in `routes.js`. **Placeholders:** equipe/CTA photos = `scientists`/`abstract.jpg` (swap later); Brasil addresses = same TEMPORARY ones as `/contato` (Curitiba+Campinas share one address); Canadá = "a confirmar". Still pending: numeric indicators (omitted - no invented numbers), real addresses (~2mo), photo direction, refined timeline prose. |
| `/sobre/aether-global-pharma` | `spec-sobre-aether-global-pharma.md` | Ready. Pending: technical validation of the 4-step value model; confirm countries before naming. |
| `/sobre/ict-aether-bio` | `spec-sobre-ict-aether-bio.md` | Ready. **Bio+ palette tokens now exist** (`safira`/`sereno` + warm/cool set in `theme.pcss`); precedents set on the `/sobre` hub - the navy `from-safira to-sereno` card, the `blue` Button variant, and the Bio+ *degradê* (use a `<Grainient>` w/ Bio+ palette as the page background). Committee names pending; confirm "AetherBio+" spelling. |
| `/sobre/equipe` | `spec-sobre-equipe.md` | Patricia P. Oliveira profile ready (CEO & Fundadora). Pending: her photo (LinkedIn+AI interim, needs her approval) + committee list. |
| `/pd` (hub) | `pd/pagina.md` | Content ready. Pending: banner image/video; committee names (phase 2). |
| `/pd/trl` | `pd/trl/pagina.md` | Content ready (full 9-level scale). Pending: ICT validation of pharma TRL equivalences; visual format + interactivity decision; possible EN version. |
| `/pd/pipeline` | **spec missing** | Client (06/2026): the **MS/EMBRAPII project is public with NO contractual comms restriction** → can seed the page as the first pipeline item (+ new LinkedIn posts). Approved description: "**plataforma produtiva para IFA anti-inflamatória**" (technically correct, cleared for use). **Do NOT publish this project's TRL stage yet** - client will only disclose TRLs from 2027, when 5 more PIs land at different stages. Other projects still pending; `spec-pd-pipeline.md` still to be written. |
| `/pd/areas` | — | **CUT** (decision 11/06). Not in the map. |
| `/midia` (feed) | `spec-midia.md` | ✅ **Built** (`src/app/midia/`). Static, WP-mappable. Card grid (3/2/1 cols), `Blogs`/`Imprensa` filter + `Todos`, 18/page, URL-synced pagination (`?categoria=`/`?pagina=`, 5-number window + arrows). Data layer = `data.ts` (the swap seam) reading `temp.json`; `MediaPost` shape mirrors a future WP GraphQL query (`blog`=internal post, `imprensa`=external link → new tab). **Shared components:** `MediaCard` + `Pagination` now live in `@/components` (reusable, not in the route folder). Each grid card is wrapped in a `<div>` inside `StaggerUp` so the stagger `y` doesn't fight the card's `hover:-translate-y-2` (gotcha documented in CLAUDE.md). `StrokePath` draws behind the grid (`max-md:hidden`). See ART-DIRECTION → "Editorial / media pages" for the full pattern. Pending: real images (card image well is `green-dark` w/ inverted-icon placeholder), real press URLs (currently `#`), newsletter yes/no (Seção 3 not built), editorial cadence. |
| `/midia/[slug]` (post) | `spec-midia.md` (template) | ✅ **Built** (`src/app/midia/[slug]/page.tsx`, SSG via `generateStaticParams`). **Layout signatures** (see ART-DIRECTION → Editorial): tinted `bg-green-light` top band behind the hero + the top half of the featured-image section; the 16:9 featured image **bleeds past the right gutter** (`col-lg-10 offset-lg-1` + `w-[calc(100%+Xrem)]`, `3rem→15rem`); title via `AnimatedText` (**not** `TextReveal` — drops spaces on variable-length titles); meta row = reading time `·` date (**no author** — removed) + `ShareButtons` right; `PostContent` body in `col-lg-8 offset-lg-1`; `RelatedPosts` Swiper closed by a plain **"Veja todas"** `Button` (no magnetic). **No `StrokePath`** on this page (deliberately the one page without the line). No "ouça agora"/bookmark. Route is `/midia/[slug]` per user directive (spec says `/midia/blog/[slug]`; `BLOG_BASE` in `data.ts` flips it in one place). Pending: real article bodies (`getContent()` returns marked placeholder HTML), real featured images. |
| `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | ✅ **Built** (`src/app/inscreva-seu-projeto/`) - layout hand-tuned by the client, mirror it. **Layout:** hero on `bg-green-light` with a **static** `icon-gp.svg` in a left rail (`col-md-2 col-lg-3`) beside the eyebrow/title/lead (`col-md-10 col-lg-9`) - Companies-section pattern, **not** an animated/rotating icon. "Como funciona" sits over a half-height `bg-green-light` band; steps are **`bg-green-dark` boxes with `green-pale` text**, stacked then `lg:grid lg:grid-cols-3` (`lg:min-h-100`), each with a small corner number (`text-6xl green-pale bottom-4 right-6`, `max-lg:hidden`). Confidentiality eyebrow sits **above** the row; box `col-md-3`, form `col-md-6` (spacer `col-md-3`). **No `StrokePath` on this page.** Breakpoints lean on **`md` + `lg` shrink**, not a flat `lg` break. 2-step form (`ProjectForm.tsx`): `Etapa X de 2` progress, `trigger()`-gated "Continuar", CSS `.fade-step-in` swap + `ScrollTrigger.refresh()` on step change. New shared **`FileUpload`** (PDF ≤15MB) + `Textarea` `microcopy`; submits `isFormData` to `/api/resend` (multipart + PDF attach + proponent confirmation when `form==='inscricao'`). TRL link → `pages.trl` (`/pd/trl`, **404 until built**). LGPD checkbox = **placeholder copy**. Pending: **Vercel ~4.5MB body limit** (15MB needs Vercel Blob in prod); accepted formats (PDF-only assumed); destination inbox (shares contato's address); final LGPD text. |
| `/politica-de-privacidade` | client copy (done) | ✅ **Built + real content** (`src/app/politica-de-privacidade/page.tsx`). Repeating **marker (`col-lg-3` eyebrow) + `.rich-text` content (`col-lg-9 col-xl-6`)** rows, `offset-lg-3` opening block, `StrokePath`, effective-date line. The reference long-form/legal layout (see ART-DIRECTION → Long-form). `pages.privacy`; linked from the LGPD checkbox. Not in footer/nav yet. |
| `/termos-e-condicoes` | client copy (done) | ✅ **Built + real content** (`src/app/termos-e-condicoes/page.tsx`). Same long-form layout as privacy; title rendered "Termos **&** Condições". `pages.termos`. Not linked anywhere yet. |
| `/parceiros` | **spec missing** | ✅ **Built** (`src/app/parceiros/page.tsx`). **No spec exists** - hero/intro/CTA copy is **invented placeholder**, to be confirmed with the client. **Dark hero with a gradient-scrim background image** (`bg-green-dark text-green-light`, **no video**) - a faint `abstract.jpg` (`opacity-50`, `h-3/4`) behind a `bg-linear-to-t from-green-dark` scrim, eyebrow `(parceiros)` + `TextReveal` h1 (light) + `AnimatedText` lead; `/parceiros` is in `Menu`'s `darkHeader` check so the logo goes light over it. A **`scientists.jpg` feature image straddles the hero→grid seam** (a `bg-white -left-30 w-[120%] h-1/2` shelf behind it, `ScrollingImage`). Then the white grid section (`AnimatedTitle` "Quem está junto da Aether" + `StaggerScale` logo grid, **same grid as the home `Partners` section**, sharing `src/utils/partners.js`) - **no `StrokePath`** here (deliberately; depth comes from the hero scrim + straddling image instead - see ART-DIRECTION → Depth). Closes with a `bg-green-dark` **two-column** CTA box (`lg:grid lg:grid-cols-2`, `overflow-hidden` rounded): left = eyebrow/headline/paragraph + `light-2` button below the text; right = a `ScrollingImage` photo filling 50% (`banner.jpg`), **`max-lg:hidden`** (dropped on mobile, not stacked). **Gotcha applied:** the CTA headline uses `AnimatedText` (not `AnimatedTitle`) - `AnimatedTitle style='light'`'s *unfilled* tone is `green-dark`, invisible on a `green-dark` box until scrubbed. The hero/grid/CTA spacing + image placement were **hand-tuned by the client** - mirror this composition. Pending: real partner list + categories, confirmed CTA copy, final photography (abstract/scientists/banner are placeholders), whether to keep the home `#parceiros` section now that the page exists. |
| `/contato` | `spec-contato.md` | ✅ **Built** (`src/app/contato/page.tsx`). "Onde estamos" = `#sobre`-style alternating text/map blocks (Sede Curitiba / Filial Campinas), each with a parallax (`ScrollingImage`) Google Maps embed (frame-friendly `pb=` URL) + "Ver no Google Maps" button. Phone/address are **temporary placeholders** (consts at top of file; both offices share the same address for now). Pending: real phone/address (~2 months, parques tecnológicos); create `contato@aethergp.com.br` (Cloudflare); per-subject email destination. |

Suggested build order: the `/sobre` **hub is built**; next are its 3 subpages (`/sobre/aether-global-pharma`,
`/sobre/ict-aether-bio`, `/sobre/equipe`) → `/pd` + `/pd/trl` → `/pd/pipeline` (waits on content). `/contato`,
`/inscreva-seu-projeto`, `/midia`, `/parceiros`, legal pages are already built.

## Cross-cutting gaps to resolve

- **Palette / brand manual.** The client confirmed the full brand palette (swatch image, this session):
  **AGP "paleta completa"** = Crème / Citron / Olive (col 1), Beige / Bordeaux / Brulé (col 2),
  Ciano / Sereno / Safira (col 3); **AetherBio+** expresses its identity as a multi-colour *degradê*
  (gradient blending the base tones - navy→bordeaux→cream→green→blue). The live olive greens map onto
  the brand: **`green-dark` = Olive, `green-light` = Citron** (green-pale is a muted sage in-between).
  **Tokens now in `theme.pcss`** under "Brand palette": `creme`/`citron`/`olive`/`beige`/`bordeaux`/
  `brule`/`ciano`/`sereno`/`safira` → Tailwind utilities `bg-bordeaux`, `from-safira to-sereno`, etc.
  **`safira #01083A` and `sereno #323F70` are documented exact values; `creme`/`beige`/`bordeaux`/
  `brule`/`ciano` are ESTIMATED from the swatch and flagged `/* confirm */` in the file - get exact
  hexes from the client before relying on them.** (The old `ict-safira`/`ict-azul` tokens were renamed
  to `safira`/`sereno`.) The `/sobre` ICT pillar card uses `from-safira to-sereno`; the Bio+ degradê is
  a candidate background for `/sobre/ict-aether-bio` (e.g. a `<Grainient>` with the Bio+ palette).
- **Form controls.** `Select`, `Honeypot`, and now **`FileUpload`** (PDF ≤15MB) + `Textarea` `microcopy`
  all exist in `src/components/Form/index.tsx`. `/api/resend` routes `Assunto` into the subject, accepts
  multipart + attaches the uploaded PDF, and sends the proponent confirmation when `form==='inscricao'`
  (all built for `/inscreva-seu-projeto`). **Caveat:** Vercel's ~4.5MB function body cap means a true
  15MB upload needs direct-to-storage (Vercel Blob) in production - the current route path is fine for
  small files / local only.
- **Header logo now adapts** (`Menu` → `usePathname()` → `darkHeader`): `green-light` over the dark home
  hero and the dark `/parceiros` hero, `green-dark` over light pages. The header is `position:absolute top-0`
  (it scrolls away with the page), so this only governs the logo over the **top** of each page - a dark hero
  + light page body just needs the route added to `darkHeader`. **Add new dark-hero routes (`/pd`, `/sobre`
  banners) to that check when built.** The page transition was reworked to the preloader-style green-block
  + spinning icon.
- **Nav surfaces are decoupled** (`src/utils/routes.js`): **`navLinks`** = full list → mobile menu +
  footer; **`headerLinks`** = trimmed subset → desktop header only (Sobre / Mídia / Inscreva seu Projeto /
  Contato). Edit each independently. Footer still maps `navLinks` but is **slated to become its own
  grouped/column array** (client wants columns; content TBD - don't restructure it yet). "Contato" →
  `/contato`, "Mídia" → `/midia`, and "Inscreva seu Projeto" → `/inscreva-seu-projeto` are real routes;
  the Banner/About "Entre em contato" CTAs also route to `/contato`. **"Parceiros" is now a real route**
  (`/parceiros`) - its `navLinks` entry was flipped from `#parceiros`. The remaining home anchors
  (Contexto/Sobre) are still `#...` (no route yet) → no-ops from a non-home page; flip each to a `/...`
  route in `navLinks` once its page lands. The home still has its `#parceiros` section (id kept).
- **Home `Contact` section is now redundant** — nothing links to the home `#contato` section anymore
  (all contact CTAs go to `/contato`). It still renders at the bottom of the home; remove/replace it in
  the home re-scope (spec-home turns it into the dual final CTA).
- **"Aether Bio+" spelling** — confirm spacing before the `+`; update consistently (live site uses
  "AetherBio+").
- **Reusable green line:** the draw-on-scroll stroke is now the `StrokePath` component
  (`src/components/Utils/Animations/StrokePath.tsx`) — use it on every new page.
- **`<Grainient />` animated gradient** (`src/components/Grainient/index.tsx`, `'use client'`): a WebGL
  grainient background (vendored from React Bits, ported to TS; needs the **`ogl`** dep). Used as the
  `/sobre` hero+valores background with a **green-toned palette** (`color1='#E0E6A1'` green-light,
  `color2='#555328'` green-dark, `color3='#23230F'` deep). It self-pauses offscreen / on tab-hidden
  (IntersectionObserver + visibilitychange). Render it inside a `relative` parent as `absolute inset-0`
  and put a `bg-green-dark/30` tint + a bottom scrim over it for light-text legibility. Reuse it for any
  branded gradient surface; **keep the palette in project green tokens** (don't reintroduce the demo's
  purple/pink defaults).

## WordPress (later)

Blog/news only, via GraphQL. `graphql-request` is already a dep; `wp.aethergp.com.br` is already an
allowed image host. Build static now with a WP-mappable data shape so the swap stays contained. See
CLAUDE.md → "Blog / news".
