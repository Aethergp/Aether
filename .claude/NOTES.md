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
| `/sobre` (hub) | `spec-sobre.md` + `sobre/pagina.md` | Timeline **confirmed** (06/2026): 2000 Bap Consult → 2025 rebrand + ICT → 2026 MS/EMBRAPII; founder Patricia; BR+CA confirmed. Still pending: numeric indicators, real addresses (~2mo), photo direction. |
| `/sobre/aether-global-pharma` | `spec-sobre-aether-global-pharma.md` | Ready. Pending: technical validation of the 4-step value model; confirm countries before naming. |
| `/sobre/ict-aether-bio` | `spec-sobre-ict-aether-bio.md` | Ready. Needs the **Bio+ complementary palette** (Safira/Azul Sereno) added; committee names pending; confirm "Aether Bio+" spelling. |
| `/sobre/equipe` | `spec-sobre-equipe.md` | Patricia P. Oliveira profile ready (CEO & Fundadora). Pending: her photo (LinkedIn+AI interim, needs her approval) + committee list. |
| `/pd` (hub) | `pd/pagina.md` | Content ready. Pending: banner image/video; committee names (phase 2). |
| `/pd/trl` | `pd/trl/pagina.md` | Content ready (full 9-level scale). Pending: ICT validation of pharma TRL equivalences; visual format + interactivity decision; possible EN version. |
| `/pd/pipeline` | **spec missing** | Client (06/2026): the **MS/EMBRAPII project is public** → can seed the page as the first pipeline item (+ new LinkedIn posts). Full technical detail/TRL + other projects still pending; `spec-pd-pipeline.md` still to be written. |
| `/pd/areas` | — | **CUT** (decision 11/06). Not in the map. |
| `/midia` (feed) | `spec-midia.md` | ✅ **Built** (`src/app/midia/`). Static, WP-mappable. Card grid (3/2/1 cols), `Blogs`/`Imprensa` filter + `Todos`, 18/page, URL-synced pagination (`?categoria=`/`?pagina=`, 5-number window + arrows). Data layer = `data.ts` (the swap seam) reading `temp.json`; `MediaPost` shape mirrors a future WP GraphQL query (`blog`=internal post, `imprensa`=external link → new tab). **Shared components:** `MediaCard` + `Pagination` now live in `@/components` (reusable, not in the route folder). Each grid card is wrapped in a `<div>` inside `StaggerUp` so the stagger `y` doesn't fight the card's `hover:-translate-y-2` (gotcha documented in CLAUDE.md). `StrokePath` draws behind the grid (`max-md:hidden`). See ART-DIRECTION → "Editorial / media pages" for the full pattern. Pending: real images (card image well is `green-dark` w/ inverted-icon placeholder), real press URLs (currently `#`), newsletter yes/no (Seção 3 not built), editorial cadence. |
| `/midia/[slug]` (post) | `spec-midia.md` (template) | ✅ **Built** (`src/app/midia/[slug]/page.tsx`, SSG via `generateStaticParams`). **Layout signatures** (see ART-DIRECTION → Editorial): tinted `bg-green-light` top band behind the hero + the top half of the featured-image section; the 16:9 featured image **bleeds past the right gutter** (`col-lg-10 offset-lg-1` + `w-[calc(100%+Xrem)]`, `3rem→15rem`); title via `AnimatedText` (**not** `TextReveal` — drops spaces on variable-length titles); meta row = reading time `·` date (**no author** — removed) + `ShareButtons` right; `PostContent` body in `col-lg-8 offset-lg-1`; `RelatedPosts` Swiper closed by a plain **"Veja todas"** `Button` (no magnetic). **No `StrokePath`** on this page (deliberately the one page without the line). No "ouça agora"/bookmark. Route is `/midia/[slug]` per user directive (spec says `/midia/blog/[slug]`; `BLOG_BASE` in `data.ts` flips it in one place). Pending: real article bodies (`getContent()` returns marked placeholder HTML), real featured images. |
| `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | ✅ **Built** (`src/app/inscreva-seu-projeto/`) - layout hand-tuned by the client, mirror it. **Layout:** hero on `bg-green-light` with a **static** `icon-gp.svg` in a left rail (`col-md-2 col-lg-3`) beside the eyebrow/title/lead (`col-md-10 col-lg-9`) - Companies-section pattern, **not** an animated/rotating icon. "Como funciona" sits over a half-height `bg-green-light` band; steps are **`bg-green-dark` boxes with `green-pale` text**, stacked then `lg:grid lg:grid-cols-3` (`lg:min-h-100`), each with a small corner number (`text-6xl green-pale bottom-4 right-6`, `max-lg:hidden`). Confidentiality eyebrow sits **above** the row; box `col-md-3`, form `col-md-6` (spacer `col-md-3`). **No `StrokePath` on this page.** Breakpoints lean on **`md` + `lg` shrink**, not a flat `lg` break. 2-step form (`ProjectForm.tsx`): `Etapa X de 2` progress, `trigger()`-gated "Continuar", CSS `.fade-step-in` swap + `ScrollTrigger.refresh()` on step change. New shared **`FileUpload`** (PDF ≤15MB) + `Textarea` `microcopy`; submits `isFormData` to `/api/resend` (multipart + PDF attach + proponent confirmation when `form==='inscricao'`). TRL link → `pages.trl` (`/pd/trl`, **404 until built**). LGPD checkbox = **placeholder copy**. Pending: **Vercel ~4.5MB body limit** (15MB needs Vercel Blob in prod); accepted formats (PDF-only assumed); destination inbox (shares contato's address); final LGPD text. |
| `/politica-de-privacidade` | client copy (done) | ✅ **Built + real content** (`src/app/politica-de-privacidade/page.tsx`). Repeating **marker (`col-lg-3` eyebrow) + `.rich-text` content (`col-lg-9 col-xl-6`)** rows, `offset-lg-3` opening block, `StrokePath`, effective-date line. The reference long-form/legal layout (see ART-DIRECTION → Long-form). `pages.privacy`; linked from the LGPD checkbox. Not in footer/nav yet. |
| `/termos-e-condicoes` | client copy (done) | ✅ **Built + real content** (`src/app/termos-e-condicoes/page.tsx`). Same long-form layout as privacy; title rendered "Termos **&** Condições". `pages.termos`. Not linked anywhere yet. |
| `/contato` | `spec-contato.md` | ✅ **Built** (`src/app/contato/page.tsx`). "Onde estamos" = `#sobre`-style alternating text/map blocks (Sede Curitiba / Filial Campinas), each with a parallax (`ScrollingImage`) Google Maps embed (frame-friendly `pb=` URL) + "Ver no Google Maps" button. Phone/address are **temporary placeholders** (consts at top of file; both offices share the same address for now). Pending: real phone/address (~2 months, parques tecnológicos); create `contato@aethergp.com.br` (Cloudflare); per-subject email destination. |

Suggested build order: shared multi-page chrome (menu/footer nav already exist) → `/sobre` family →
`/pd` + `/pd/trl` → `/contato` + `/inscreva-seu-projeto` → `/midia`. `/pd/pipeline` waits on content.

## Cross-cutting gaps to resolve

- **Palette / brand manual.** The implemented, live theme is olive-green (`green-dark`/`green-pale`/
  `green-light`). Several specs use brand-manual color *names* not in the theme — **Bordeaux / Verde
  Citron / Crème** (main) and **Safira `#01083A` / Azul Sereno `#323F70`** (Bio+). Confirm against
  `_docs/original/` whether the green palette is canonical (it's what's live/approved) or the fuller
  brand palette should be introduced. **Concrete need:** `/sobre/ict-aether-bio` (and Bio+ accents on
  `/pd`) call for the Safira/Azul Sereno complementary palette — add those as theme tokens and decide
  how far they extend (whole page vs. accents) before building that page.
- **Form controls.** `Select`, `Honeypot`, and now **`FileUpload`** (PDF ≤15MB) + `Textarea` `microcopy`
  all exist in `src/components/Form/index.tsx`. `/api/resend` routes `Assunto` into the subject, accepts
  multipart + attaches the uploaded PDF, and sends the proponent confirmation when `form==='inscricao'`
  (all built for `/inscreva-seu-projeto`). **Caveat:** Vercel's ~4.5MB function body cap means a true
  15MB upload needs direct-to-storage (Vercel Blob) in production - the current route path is fine for
  small files / local only.
- **Header logo now adapts** (`Menu` → `usePathname()` → `darkHeader`): `green-light` over the dark home
  hero, `green-dark` over light pages. **Add new dark-hero routes (`/pd`, `/sobre` banners) to that check
  when built.** The page transition was reworked to the preloader-style green-block + spinning icon.
- **Nav surfaces are decoupled** (`src/utils/routes.js`): **`navLinks`** = full list → mobile menu +
  footer; **`headerLinks`** = trimmed subset → desktop header only (Sobre / Mídia / Inscreva seu Projeto /
  Contato). Edit each independently. Footer still maps `navLinks` but is **slated to become its own
  grouped/column array** (client wants columns; content TBD - don't restructure it yet). "Contato" →
  `/contato`, "Mídia" → `/midia`, and "Inscreva seu Projeto" → `/inscreva-seu-projeto` are real routes;
  the Banner/About "Entre em contato" CTAs also route to `/contato`. The others (Contexto/Sobre/Parceiros)
  are still home anchors `#...` (no route yet) → no-ops from a non-home page; flip each to a `/...` route
  in `navLinks` once its page lands.
- **Home `Contact` section is now redundant** — nothing links to the home `#contato` section anymore
  (all contact CTAs go to `/contato`). It still renders at the bottom of the home; remove/replace it in
  the home re-scope (spec-home turns it into the dual final CTA).
- **"Aether Bio+" spelling** — confirm spacing before the `+`; update consistently (live site uses
  "AetherBio+").
- **Reusable green line:** the draw-on-scroll stroke is now the `StrokePath` component
  (`src/components/Utils/Animations/StrokePath.tsx`) — use it on every new page.

## WordPress (later)

Blog/news only, via GraphQL. `graphql-request` is already a dep; `wp.aethergp.com.br` is already an
allowed image host. Build static now with a WP-mappable data shape so the swap stays contained. See
CLAUDE.md → "Blog / news".
