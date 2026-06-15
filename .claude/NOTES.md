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
| `/midia` (blog) | `spec-midia.md` | Structure ready; **build static now**, WordPress/GraphQL later. Pending: newsletter yes/no; editorial cadence; post authorship. |
| `/midia/blog/[slug]` | `spec-midia.md` (template) | Static post template now; WP-backed later. Per-post SEO. |
| `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | 2-step form. Needs a **`Select` + file-upload control** (don't exist) and route changes (below). Pending: accepted formats (PDF?); destination inbox; LGPD notice text. |
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
- **Form controls.** `Select` + `Honeypot` now exist in `src/components/Form/index.tsx` (built for
  `/contato`); `/api/resend` now routes `Assunto` into the email subject. **Still missing: a file-upload
  control** for `/inscreva-seu-projeto` (PDF ≤15MB) — `isFormData` works client-side but the route
  doesn't attach files yet; that page also needs a 2nd confirmation email to the proponent.
- **Header logo now adapts** (`Menu` → `usePathname()` → `darkHeader`): `green-light` over the dark home
  hero, `green-dark` over light pages. **Add new dark-hero routes (`/pd`, `/sobre` banners) to that check
  when built.** The page transition was reworked to the preloader-style green-block + spinning icon.
- **Nav links are centralized** in `navLinks` (`src/utils/routes.js`) — single source for the 3 surfaces
  (desktop header, mobile menu, footer). "Contato" → `/contato`; the Banner/About "Entre em contato"
  CTAs also route to `/contato`. The others (Contexto/Sobre/Parceiros) are still home anchors `#...` (no
  route yet) → no-ops from a non-home page; flip each to a `/...` route in `navLinks` once its page lands.
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
