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
| `/sobre/aether-global-pharma` | `spec-sobre-aether-global-pharma.md` | ✅ **Built** (`src/app/sobre/aether-global-pharma/page.tsx`). 5 sections per spec: (1) **full-height `min-h-lvh` dark `Grainient` hero** (section `min-h-lvh flex flex-col`, content `grow flex flex-col justify-center`) - eyebrow + the **AGP wordmark** (`aether-gp.svg`) recolored to `green-light` via a CSS **`mask-image`** span (the file is green-dark = invisible on dark, so mask it, don't `<Image>` it) + H1 + intro; **`/sobre/aether-global-pharma` is now in `Menu` `darkHeader`**. (2) "principais funções" white section w/ a green `StrokePath` + the 6 funções as a 2-col `green-pale` pill grid (GP icon). (3) **"o modelo" = the key new section on a `bg-green-dark` band**: the real photo `lab-meeting.jpg` (a `ScrollingImage` parallax; copied+downscaled from `_docs/imgs/shutterstock_2316798063.jpg`) straddles into the 4 numbered step cards (01 Captura / 02 Desrisking / 03 Posicionamento / 04 Valorização). **Its H2 uses `AnimatedText`, NOT `AnimatedTitle style='light'`** - the unfilled gradient tone (`#555328`) is invisible on the green-dark band (the documented gotcha; same reason `/sobre` avoids it on dark). (4) "Estratégia de um lado. Ciência do outro." → the **ICT cross-link**: a navy Bio+ `from-safira to-sereno` card w/ white-masked `icon-bio.svg` + **`blue-light` Button** (azul-claro bg, safira text, hover→white) → `pages.sobreIct`. (5) bespoke dark-`Grainient` final CTA (spec copy: licenciamento/parcerias/investimento) → `pages.contato`. Verified desktop+mobile (no overflow), `tsc` clean. **Placeholders/pending:** the 4-step model is OUR proposal from existing material - **client must validate technically**; copy stays w/ the client's own "Brasil e internacionalmente" wording and does NOT assert specific countries (spec pending #2); `lab-meeting.jpg` is a stock placeholder photo to swap for real brand photography. |
| `/sobre/ict-aether-bio` | `spec-sobre-ict-aether-bio.md` | ✅ **Built** (`src/app/sobre/ict-aether-bio/page.tsx`). **This is the complementary-palette page: predominant blue + terracotta, with the original green kept as ACCENT** (client direction, 06/2026). Sections 1-2 are now **ONE client component `Hero.tsx`** (hero + premissa quote + pinned circles) sharing **ONE continuous `Grainient` field that shifts colour on scroll** (`BioGrainient.tsx`). **The shared-field mechanic (mirrors `/sobre`):** the `position:fixed` Grainient is scoped by an inline **`clipPath:'inset(0% 0% 0% 0%)'`** which establishes a containing block so it's clipped to the field area - it stays viewport-fixed as you scroll, then the clip hides it at the white sections below. **CRITICAL: the clipPath lives on `BioGrainient`'s own `absolute inset-0 z-0` background div, NOT on the parent `<section id='bio-field'>`.** This is deliberate: a clipPath (or transform) ancestor over the pinned circles forces `pinType:'fixed'` to anchor to that clipped box instead of the viewport → the circles **drift/jitter** as you scroll. By putting the clipPath only on the background-sibling layer, the pinned circles have NO clip-path/transform ancestor, so they can use the rock-solid **`pinType:'fixed'`** (see the pin note below). The section itself is plain `relative` (position:relative does NOT create a fixed-containing-block). `BioGrainient` is a **small child that owns the colour `useState`** (so only it re-renders per scroll frame, not the whole hero): a scrubbed `ScrollTrigger` (`trigger:#bio-field`, `top top`→`bottom bottom`, `refreshPriority:-1`) `onUpdate` lerps the 3 hex colours from a **green-led START `['#555328','#323F70','#DDB295']`** (top) to a **blue+terracotta END `['#2f3a68','#6B1C2A','#9a8b52']`** (bottom = a bit less green, per client) and `setColors` - the `Grainient` props→uniforms effect re-tints with zero teardown. Uniform `bg-black/25` tint over the whole field for legibility (neutral, so it biases neither the green top nor the blue/terracotta bottom). (1) **hero block** = `min-h-lvh flex flex-col justify-center` (fills 100lvh), eyebrow + the **Aether Bio+ wordmark** (`aether-bio.svg`) masked to **`creme`** + H1 + intro, text `creme`; **`/sobre/ict-aether-bio` is in `Menu` `darkHeader`** (the green-light logo sits on the GREEN top of the field - that's why START is green-led, so the logo never clashes with navy). (2) **the premissa quote is a normal block**, then the **3 big OUTLINE-only circles** (`border` = 1px, transparent fill, **now `border-green-light text-green-light`** - the client switched them from per-concept brand colours to white/light-green) that **lightly overlap like connected rings** (`lg:-ml-[2vw]` desktop / `-mt-6` mobile), sized `lg:w-[29vw] lg:max-w-[34rem]` / mobile `w-[76vw] max-w-[24rem]`, text small (`text-24 lg:text-30`). Each ring wrapped in **`MagneticButton`** (`strength 45`, desktop-only cursor-follow). **Desktop (`innerWidth>=992`): the circles wrapper is PINNED** (`trigger:pin`, `pin`, **`pinType:'fixed'`** - same as the esfera home + the `Banner`; gives a jitter-free hold. We first tried `pinType:'transform'` and it visibly drifted/jittered the circles on scroll - `fixed` is solid, and it only works because the clipPath was moved off the section onto the background div, above; `scrub:1`, `end:'+=innerHeight*1.8'`, `refreshPriority:1`, then `rAF`→`refresh(true)`) revealing each ring (`scale .5→1`, `power3.out`). **Mobile: no pin** (own `top 85%` triggers). Hidden state = inline `transform:scale(.5)` (not a Tailwind `scale-*` class). Verified no horizontal overflow + field clips correctly at the white sections at 1280/992/375. `bio-microscope.jpg` was removed; `Premissa.tsx` was replaced by `Hero.tsx`+`BioGrainient.tsx`. (3) "o instituto" white section + 6 funções as **flat `bg-sereno` (Azul Sereno) pills** (client switched them from green-pale → dark blue, then asked for a FLAT solid blue, no gradient) w/ **`azul-claro` text + `azul-claro`-masked bio icon**; the **"avanço de TRLs" item carries a `Saiba mais` link → `pages.trl`** (404 until built; link `hover:text-white` on the navy pill). (4) "governança" navy `from-safira to-sereno` card, **`text-azul-claro`** (client found the warm `creme` text strange on navy), **text only** (committee names pending legal alignment per spec). (5) "para pesquisadores" captação: `Sua pesquisa pode ir além do laboratório.` + `bio-lab.jpg` (blue research photo, **tall `lg:min-h-[120vh]` / `max-lg:aspect-3/4`, matching home `About`**) + **`blue-dark` Button** (navy `safira` bg, `azul-claro` text, hover→`vinho` #3D0108) → `pages.inscreva`. (6) **the AGP cross-link = a `green-dark` card** (brings the mother-green back as accent, mirrors how the AGP page used a navy card for ICT) w/ green-light-masked GP icon + `light-2` Button → `pages.sobreAgp`. Dark-band/navy headings use `AnimatedText` only where the bg matches the AnimatedTitle unfilled tone; **the white-section text (eyebrows/titles/body) is `vinho #3D0108` (dark red-brown), NOT green** - client wanted no olive on this page; eyebrows/body carry `text-vinho`, the H2s use the new **`AnimatedTitle style='vinho'`** (fills to `#3D0108`). The only green left is the AGP cross-link card (it = the AGP entity). Verified desktop+mobile (no overflow), `tsc` clean. **Spelling note:** spec decided official grafia is **"Aether Bio+"** (separated) and to update the whole site from "AetherBio+"; this page still uses the client copy's "AetherBio+" verbatim - **do the site-wide spelling swap as a separate pass**. **Status: closed for this pass** - the effects (scroll-colour field, pinned magnetic rings, palette transition) are done and signed off by the client; **a LAYOUT revision is expected later** (client said they'll revisit the page's layout), so treat the section structure as provisional. **Pending:** committee profile grid (names+authorizations), final "+" spacing, palette-extent sign-off w/ designer, the planned layout revision. |
| `/sobre/equipe` | `spec-sobre-equipe.md` | ✅ **Built** (`src/app/sobre/equipe/page.tsx` + `Committee.tsx`). **Color rhythm deepens top→bottom** (white hero → white leadership → `green-pale` committee → `green-dark` CTA → footer) - do NOT make a lone green band sandwiched by whites with a trailing white CTA (the first attempt did white/green/white/footer and read as choppy). **Light hero** (warm white, eyebrow `(equipe)` + `AnimatedText` H1 + lead) → **NOT** in `Menu` `darkHeader` (green-dark logo). **Leadership** = single featured profile (spec Seção 2 - one person → featured layout, not a card grid): row is `lg:items-stretch` with the portrait `col-lg-5` and text `col-lg-6 offset-lg-1 flex flex-col justify-center` so the two columns are equal height and the text vert-centers against the photo (**fixes the 1920px imbalance** - the earlier `lg:sticky aspect-4/5` portrait was much taller than the centered text and looked off on wide screens; portrait is now `lg:h-full lg:min-h-150`, height-matched to the text). Portrait uses **`ScrollingImage` parallax** (NOT `ImageReveal` - client wanted the same parallax drift as other pages) with a **LinkedIn icon-only button** absolutely positioned `bottom-left` *inside* the photo (a `bg-green-dark` rounded box with the `social/linkedin.svg` in `green-light`; it's a sibling of `ScrollingImage` so it stays put while the image parallaxes) - replaced the old "Ver perfil no LinkedIn" text link. Then "(realizações em destaque)" `StaggerUp` list with **bullet dots** (client removed the 01/02/03 numbers). (**no `StrokePath` on this page** - client cut it here, "ficou muito ruim"; note for reference: a draw-on-scroll path in the hero never animates anyway since the hero sits at top with ~no scroll range, so if ever re-added it must go in a tall scroll-through section, not the hero.) **Comitê científico** = `Committee.tsx` `'use client'`: a `StaggerUp` grid (`grid-cols-2 md:grid-cols-3`) of **grayscale photo cards** (each a `<button>`, hover → `grayscale-0` + scale; **the Stagger direct child is a plain `<div>` wrapper, the hover transform is on the inner button** per the Stagger-child gotcha) that open a **self-managed modal** (React state, not the global `Dialog`/`[data-dialog]` system - that double-binds with N instances) showing the full-color photo + titulação/área/instituição + bio; Esc/backdrop/X close, locks `#viewport` (`overflow:hidden` + `data-scroll-paused`). **Final CTA = the shared dark-green 2-col banner** (`bg-green-dark` rounded card, text + `ScrollingImage`, `light-2` Button → `/contato`) - **replicated from `/parceiros`'s "seja um parceiro" banner, not a bespoke centered-white block** (the first attempt's white centered CTA looked weak; the site already has this banner pattern - reuse it). **Placeholders:** leader portrait = `src/assets/img/portrait-patricia.jpg` (temp stock businesswoman); committee = 6 temp stock portraits in `src/assets/img/team/member-{1..6}.jpg` framed via `objectPosition:'center 18%'`, with `Nome a confirmar` names + placeholder área/bio (real names/titulação/instituição/bio + photos all pending Patricia's legal alignment). |
| `/pd` (hub) | `pd/pagina.md` | Content ready. Pending: banner image/video; committee names (phase 2). |
| `/pd/trl` | `pd/trl/pagina.md` | ✅ **Built** (`src/app/pd/trl/page.tsx` + `TRLScale.tsx` + `TRLCta.tsx`). **Light hero** (matches its parent `/pd` - eyebrow + `AnimatedText` H1 + lead + a small NBR ISO reference line; **NOT** in `darkHeader`, so green-dark logo). Sections: contexto (`StrokePath` - a **right-side mirrored** arc vs `/pd`'s left one - + masked `icon-bio` + `AnimatedTitle` + a `green-pale` "Referência normativa" card) → **"a jornada" = 3 phase blocks with a deliberate monochrome-green escalation** (white/bordered → `green-pale` → `green-dark`; **client said NO red/brown tones on this page**, so the spec's "vegetal → quente" warm ending was replaced with a light→deep olive progression). **Centerpiece = `TRLScale.tsx` (the page's bespoke move): an interactive accordion of the 9 levels**, single-open (TRL 1 open by default), each row = big phase-coloured number + name + `+/-` box toggle (Menu-style); expands via a **`grid-rows-[0fr]→[1fr]`** transition (no GSAP) to reveal description + a "No contexto farmacêutico" line; a left accent bar + number colour encode the 3 phases via deepening olive saturation (`green-dark/25` → `/55` → full, NO red/brown); `ScrollTrigger.refresh()` on toggle keeps footer/stroke triggers accurate after the height change; wrapped in `StaggerUp`. Then **"a abordagem aether" = a `bg-green-dark` section** (faint `icon-bio` watermark, `AnimatedText` title - unfilled `AnimatedTitle` tone is invisible on green-dark, the gotcha) with the 6 principles as `green-light/[0.07]` pills (GP icon masked green-light) + a bordered pull-quote. CTA = `TRLCta.tsx` (pinned `TextReveal` "Em que nível está a sua tecnologia?" on a `green-light/40` band, mirrors `PDCTA`) → `/inscreva-seu-projeto` + back to `/pd`. Verified desktop(1280, 3-col journey)/tablet/mobile(375, no overflow), `tsc` clean. **Pending:** ICT validation of the pharma TRL equivalences (IND/BPL/fases - spec decisão #1); possible EN version (#5); the optional RBIF regulatory-doc table (#4) was NOT built (extra, deferred). |
| `/pd/pipeline` | **spec missing** (content from `spec-indice-geral.md` notes + `spec-home.md` Seção 4 + `pd/pagina.md` Card A) | ✅ **Built** (`src/app/pd/pipeline/page.tsx`, single server component - no extra client file). **Light hero** (matches `/pd` + `/pd/trl`: eyebrow `(pipeline)` + `AnimatedText` H1 + lead; **NOT** in `darkHeader`, green-dark logo). The page is **content-light by design** - only ONE fully-disclosable project exists, so it's built as an editorial feature, not the repeated hero+stroke+grid skeleton. Sections: (1) hero. (2) **"projeto em destaque" = a `bg-green-dark` feature band** (`StrokePath` mirrored-right arc at low `opacity-30`) - the MS/EMBRAPII flagship: a "Projetos de Alto Impacto em Saúde" program pill + H2 "Selecionada em chamada pública nacional de R$ 90 milhões." (`AnimatedText`, **not** `AnimatedTitle` - unfilled tone invisible on green-dark) + the confirmed description paragraph + a "Foco técnico" highlight box reading **"Plataforma produtiva para IFA anti-inflamatória."** (the client-approved phrasing) + 4 partner pills (Ministério da Saúde / EMBRAPII / CQMED / UFMG - Inovação de Fármacos) + `microscope.jpg` (`col-lg-5`, placeholder photo) + a 2-cell stats grid using **`Counter`** (R$ **90** mi animated; R$ **12,5** mi is STATIC text since `Counter` floors to int - no decimals). **No TRL stage shown for this project** (client: don't publish until 2027). (3) "como organizamos" white section - the pipeline's reading taxonomy as 3 `green-pale` cards (estágio de maturidade / área terapêutica / status), `StaggerUp`, + a `Button → pages.trl`. (4) **"em expansão" `green-pale/40` section = honest forward-looking placeholder**: 3 **dashed-border skeleton cards** tagged "A PARTIR DE 2027" with a "Quadro ilustrativo..." disclaimer - represents the +5 PIs landing 2027 WITHOUT inventing project names. (5) bespoke `bg-green-dark` centered CTA (faint `icon-bio` watermark, `AnimatedText` 2-line title) → `pages.inscreva` (`light-2`) + `pages.contato` (`dark-2`). Verified 200 SSR + browser render (counter animates, all sections clean), `tsc` clean. **Placeholders/pending:** `microscope.jpg` = stock placeholder (swap for real project/brand photo); the 3 "em expansão" cards are illustrative (real assets replace them as they clear for disclosure); additional anonymized pipeline assets (B1) + this project's TRL (from 2027) still pending client. **`text-15` is a no-op class** (no `.text-15` utility exists - inherits base size; an existing convention in `/pd`+`/pd/trl`, kept here for pills); the real type tokens are text-16/18/20/24/30/36/60/72 (`typography.pcss`). |
| `/pd/areas` | — | **CUT** (decision 11/06). Not in the map. |
| `/midia` (feed) | `spec-midia.md` | ✅ **Built** (`src/app/[locale]/midia/`). Static, WP-mappable (no active WP plan - see CLAUDE.md → "Blog / news"). Card grid (3/2/1 cols), `Blogs`/`Imprensa` filter + `Todos`, 18/page, URL-synced pagination (`?categoria=`/`?pagina=`, 5-number window + arrows). Data layer = `data.ts` (the swap seam) reading `db/posts.json`, whose translatable fields (title/excerpt/category/author/content, image alt) carry a per-locale `translations` object; `MediaPost` shape mirrors a future WP GraphQL query (`blog`=internal post, `imprensa`=external link → new tab). **Shared components:** `MediaCard` + `Pagination` now live in `@/components` (reusable, not in the route folder). Each grid card is wrapped in a `<div>` inside `StaggerUp` so the stagger `y` doesn't fight the card's `hover:-translate-y-2` (gotcha documented in CLAUDE.md). `StrokePath` draws behind the grid (`max-md:hidden`). See ART-DIRECTION → "Editorial / media pages" for the full pattern. Pending: real images (card image well is `green-dark` w/ inverted-icon placeholder), real press URLs (currently `#`), newsletter yes/no (Seção 3 not built), editorial cadence. |
| `/midia/[slug]` (post) | `spec-midia.md` (template) | ✅ **Built** (`src/app/midia/[slug]/page.tsx`, SSG via `generateStaticParams`). **Layout signatures** (see ART-DIRECTION → Editorial): tinted `bg-green-light` top band behind the hero + the top half of the featured-image section; the 16:9 featured image **bleeds past the right gutter** (`col-lg-10 offset-lg-1` + `w-[calc(100%+Xrem)]`, `3rem→15rem`); title via `AnimatedText` (**not** `TextReveal` — drops spaces on variable-length titles); meta row = reading time `·` date (**no author** — removed) + `ShareButtons` right; `PostContent` body in `col-lg-8 offset-lg-1`; `RelatedPosts` Swiper closed by a plain **"Veja todas"** `Button` (no magnetic). **No `StrokePath`** on this page (deliberately the one page without the line). No "ouça agora"/bookmark. Route is `/midia/[slug]` per user directive (spec says `/midia/blog/[slug]`; `BLOG_BASE` in `data.ts` flips it in one place). Pending: real article bodies (`getContent()` returns marked placeholder HTML), real featured images. |
| `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | ✅ **Built** (`src/app/inscreva-seu-projeto/`) - layout hand-tuned by the client, mirror it. **Layout:** hero on `bg-green-light` with a **static** `icon-gp.svg` in a left rail (`col-md-2 col-lg-3`) beside the eyebrow/title/lead (`col-md-10 col-lg-9`) - Companies-section pattern, **not** an animated/rotating icon. "Como funciona" sits over a half-height `bg-green-light` band; steps are **`bg-green-dark` boxes with `green-pale` text**, stacked then `lg:grid lg:grid-cols-3` (`lg:min-h-100`), each with a small corner number (`text-6xl green-pale bottom-4 right-6`, `max-lg:hidden`). Confidentiality eyebrow sits **above** the row; box `col-md-3`, form `col-md-6` (spacer `col-md-3`). **No `StrokePath` on this page.** Breakpoints lean on **`md` + `lg` shrink**, not a flat `lg` break. 2-step form (`ProjectForm.tsx`): `Etapa X de 2` progress, `trigger()`-gated "Continuar", CSS `.fade-step-in` swap + `ScrollTrigger.refresh()` on step change. **`FileUpload` with `uploadToR2`** (PDF ≤15MB): file goes **directly browser→Cloudflare R2** via presigned PUT URL from `/api/r2-presign` (bypasses Vercel body limit); the field value becomes the R2 object key; form submits as JSON (no `isFormData`). The `/api/resend` route generates a 7-day presigned download link and includes it in the email. R2 bucket = `aether` on Cloudflare account `57be2523030678144fc0bb3096141753`; CORS configured for `aethergp.com.br` + `www.aethergp.com.br` + the staging Vercel URL + `localhost:3000`. TRL link → `pages.trl` (`/pd/trl`). LGPD checkbox = **placeholder copy**. Pending: accepted formats (PDF-only assumed); final LGPD text. |
| `/politica-de-privacidade` | client copy (done) | ✅ **Built + real content** (`src/app/politica-de-privacidade/page.tsx`). Repeating **marker (`col-lg-3` eyebrow) + `.rich-text` content (`col-lg-9 col-xl-6`)** rows, `offset-lg-3` opening block, `StrokePath`, effective-date line. The reference long-form/legal layout (see ART-DIRECTION → Long-form). `pages.privacy`; linked from the LGPD checkbox. Not in footer/nav yet. |
| `/termos-e-condicoes` | client copy (done) | ✅ **Built + real content** (`src/app/termos-e-condicoes/page.tsx`). Same long-form layout as privacy; title rendered "Termos **&** Condições". `pages.termos`. Not linked anywhere yet. |
| `/parceiros` | **spec missing** | ✅ **Built** (`src/app/parceiros/page.tsx`). **No spec exists** - hero/intro/CTA copy is **invented placeholder**, to be confirmed with the client. **Dark hero with a gradient-scrim background image** (`bg-green-dark text-green-light`, **no video**) - a faint `abstract.jpg` (`opacity-50`, `h-3/4`) behind a `bg-linear-to-t from-green-dark` scrim, eyebrow `(parceiros)` + `TextReveal` h1 (light) + `AnimatedText` lead; `/parceiros` is in `Menu`'s `darkHeader` check so the logo goes light over it. A **`scientists.jpg` feature image straddles the hero→grid seam** (a `bg-white -left-30 w-[120%] h-1/2` shelf behind it, `ScrollingImage`). Then the white grid section (`AnimatedTitle` "Quem está junto da Aether" + `StaggerScale` logo grid, **same grid as the home `Partners` section**, sharing `src/utils/partners.js`) - **no `StrokePath`** here (deliberately; depth comes from the hero scrim + straddling image instead - see ART-DIRECTION → Depth). Closes with a `bg-green-dark` **two-column** CTA box (`lg:grid lg:grid-cols-2`, `overflow-hidden` rounded): left = eyebrow/headline/paragraph + `light-2` button below the text; right = a `ScrollingImage` photo filling 50% (`banner.jpg`), **`max-lg:hidden`** (dropped on mobile, not stacked). **Gotcha applied:** the CTA headline uses `AnimatedText` (not `AnimatedTitle`) - `AnimatedTitle style='light'`'s *unfilled* tone is `green-dark`, invisible on a `green-dark` box until scrubbed. The hero/grid/CTA spacing + image placement were **hand-tuned by the client** - mirror this composition. Pending: real partner list + categories, confirmed CTA copy, final photography (abstract/scientists/banner are placeholders), whether to keep the home `#parceiros` section now that the page exists. |
| `/contato` | `spec-contato.md` | ✅ **Built** (`src/app/contato/page.tsx`). "Onde estamos" = `#sobre`-style alternating text/map blocks (Sede Curitiba / Filial Campinas), each with a parallax (`ScrollingImage`) Google Maps embed (frame-friendly `pb=` URL) + "Ver no Google Maps" button. Phone/address are **temporary placeholders** (consts at top of file; both offices share the same address for now). Pending: real phone/address (~2 months, parques tecnológicos); create `contato@aethergp.com.br` (Cloudflare); per-subject email destination. |

Suggested build order: the `/sobre` **hub is built**; next are its 3 subpages (`/sobre/aether-global-pharma`,
`/sobre/ict-aether-bio`, `/sobre/equipe`) → `/pd` + `/pd/trl` → `/pd/pipeline` (waits on content). `/contato`,
`/inscreva-seu-projeto`, `/midia`, `/parceiros`, legal pages are already built.

## Internationalization (i18n branch, content rollout complete)

**Phase 0 done:** `next-intl` installed and wired into `next.config.mjs` via
`createNextIntlPlugin('./src/i18n/request.ts')`; `src/i18n/{routing,request,navigation}.ts` + typed
`AppConfig` in `src/types/next-intl.d.ts`. Locales: `pt-BR` (default, no prefix) / `en-US` (`/en-us`) /
`es` (`/es`).

**Phase 1 done:** all routes moved from `src/app/*` to `src/app/[locale]/*`; `NextIntlClientProvider` +
locale validation wired into `src/app/[locale]/layout.tsx`; minimal root `src/app/layout.tsx`
(passthrough) + `src/app/not-found.tsx` (non-localized fallback); `src/app/[locale]/[...rest]/page.tsx`
(`notFound()`) so unknown paths render the styled locale-aware 404. See CLAUDE.md → Architecture →
"Internationalization (next-intl)" for the full mechanics.

**Content rollout done — every route, every shared component, and the blog data itself are translated.**
UI chrome across `404`, `/contato`, `/parceiros`, home, `/inscreva-seu-projeto`,
`/desenvolvimento-de-ativos` + `trl` + `pipeline`, `/midia` feed + post template, `/sobre` + its 3
subpages (`aether-global-pharma`, `ict-aether-bio`, `equipe`), both legal pages, plus the shared `Menu`/
`Footer`/`Committee`/`Form`/`Pagination`/`ContactBanner`/`MediaCard` components (validation error
messages, aria-labels, the "Link externo" badge, etc.) all live in
`src/messages/{pt-BR,en-US,es}.json`. **The blog post data itself is also translated**: `db/posts.json`
(renamed from the old `temp.json` once the client confirmed a WordPress swap isn't happening any time
soon) carries a per-locale `translations` object on every post - see CLAUDE.md → "Blog / news" for the
shape. The `/midia` post-date month formatting (`formatDate(iso, locale)` in `db/data.ts`) is locale-aware
too.

**Locale detection + manual switching done:** the middleware's geolocation redirect falls through to
next-intl's own Accept-Language negotiation when `x-vercel-ip-country` is absent (local dev, or any
non-Vercel host). A manual `LocaleSwitcher` (`src/components/LocaleSwitcher/`) is wired into `Menu`: a
hover-dropdown in the desktop header (`max-sm:hidden`) and a 3-pill inline row in the fs mobile menu
(`sm:hidden`).

**Locale-prefixed navigation + SEO metadata done:** every internal `Link`/`Button` href, `pageGraph()`/
`breadcrumbs()`'s WebPage/BreadcrumbList URLs, and every page's `alternates.canonical`/`openGraph.url`
now resolve through `getLocalizedPathname()` for the current locale, and `alternates.languages` emits a
full hreflang set (see CLAUDE.md → Architecture → "Internationalization (next-intl)" for the mechanics
and which files own which piece). `next-sitemap.config.js` builds its own route list via
`additionalPaths` (translated routes × locales, plus blog slugs) since next-sitemap's auto-discovery
can't resolve `[locale]`.

**Localized URL slugs done:** every static route's URL segment is now translated per locale via
next-intl's `pathnames` config in `src/i18n/routing.ts` (e.g. `/sobre` → `/en-us/about` → `/es/nosotros`,
`/inscreva-seu-projeto` → `/en-us/submit-your-project` → `/es/inscriba-su-proyecto`; brand names and
existing loanwords like Pipeline/TRL stay untranslated). The pt-BR path remains the single canonical key
used throughout the app - `getLocalizedPathname()` (`src/i18n/navigation.ts`) wraps next-intl's
`getPathname()` to keep every call site on a lenient `string` signature and to special-case the dynamic
`/midia/[slug]` → `/media/[slug]` / `/medios/[slug]` route (which needs the object `{pathname, params}`
form). `LocaleSwitcher` has a matching guard: `usePathname()` returns the *literal* `'/midia/[slug]'`
template on a blog post page (not the real slug), so it separately reads the real slug via
`useParams()` from `next/navigation` and switches locale with the object form instead of blindly
replacing the path - verified in-browser (switching EN→ES from a live post correctly landed on
`/es/medios/<same-slug>`, not a broken `[slug]` URL). See CLAUDE.md → Architecture →
"Internationalization (next-intl)" for the full mechanics.

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
- **Form controls.** `Select`, `Honeypot`, and **`FileUpload`** (with optional `uploadToR2` prop) + `Textarea` `microcopy`
  all exist in `src/components/Form/index.tsx`. `/api/resend` routes `Assunto` into the subject, accepts
  multipart + attaches the uploaded PDF (small files only), and sends the proponent confirmation when `form==='inscricao'`.
  **File uploads ≤15MB use Cloudflare R2** via presigned URLs (`/api/r2-presign`) - the browser uploads directly to R2,
  bypassing Vercel's ~4.5MB body limit. **Honeypot field is named `b_website`** (was `company` - password managers
  auto-filled the old name with the company from the user's vault, silently triggering the anti-spam check).
- **Header logo now adapts** (`Menu` → `usePathname()` → `darkHeader`): `green-light` over the dark home
  hero and the dark `/parceiros` hero, `green-dark` over light pages. The header is `position:absolute top-0`
  (it scrolls away with the page), so this only governs the logo over the **top** of each page - a dark hero
  + light page body just needs the route added to `darkHeader`. **Add new dark-hero routes (`/pd`, `/sobre`
  banners) to that check when built.** The page transition uses the green-block
  + spinning icon.
- **Nav surfaces are decoupled** (`src/utils/routes.js`): **`navLinks`** → fs/mobile menu, **`headerLinks`**
  → desktop header, **`footerColumns`** (`NavItem[][]`) → footer. Edit each independently. Sobre/P&D carry
  `children` (`sobreChildren`/`pdChildren` consts, shared by nav+header). **Header is now Sobre / P&D / Mídia /
  Contato — `Inscreva seu Projeto` was commented out of `headerLinks`** (lives only in the fs menu + footer
  now). `routes.js` is **JSDoc-typed** (`@typedef NavItem`, optional `children`) so components read
  `item.children` without TS union errors - keep the `/** @type {NavItem[]} */` annotations. **`#contexto`
  was removed.** Subpages 404 until built (intentional). **The Menu's full mechanics (header dropdown +
  chevron, the fs layered-reveal, item cascade, accordion, +/- toggle, right-arrow pills) are documented in
  CLAUDE.md → Signature recipes → "The Menu" - read that before touching the menu.** Quick map of the
  current fs-menu treatment: **3 stacked `<aside>` panels** (`green-dark`/`green-pale`/`green-light`, z-97/98/99,
  `duration-300/400/500`) slide in at different speeds = layered curtain; each item is a **green block**
  (`bg-green-dark/[0.07] rounded-sm`) that **cascades in** via inline `transitionDelay: i*50+150ms`; accordion
  children are **pill-buttons** with a **right arrow** (`arrow-right.svg`, not the diagonal). **Footer dropped
  the "Navegação" heading** (user edit) - it's just the 4 columns now + the right-aligned Conecte-se/Copyright/
  "Voltar ao topo" block; omits Início, uses short "TRL" label. The Banner/About "Entre em contato" CTAs route
  to `/contato`; the home still has its `#parceiros` section (id kept).
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

## SEO / performance baseline (done 2026-07-20)

### JSON-LD architecture

All structured data lives in **`src/utils/schema.ts`** and renders through **`src/components/JsonLd`**.
Every node carries a stable `@id` so nodes reference each other instead of being repeated.

- **Global (layout, every page):** an `@graph` of `Organization` + `ResearchOrganization` (ICT
  AetherBio+, linked both ways via `parentOrganization`/`subOrganization`) + `Person` (Patricia P.
  Oliveira, `founder`) + `WebSite`.
- **Per page: call `pageGraph({ type, path, name, description, trail, extend?, extra? })`** - it emits
  a typed WebPage bound to the WebSite/Organization plus its `BreadcrumbList`, and is the ONLY thing a
  new route needs. Pass `name`/`description` as `metadata.title`/`metadata.description` so the schema
  can't drift from the meta tags. `trail: []` (home) skips the breadcrumb node.
  Types in use: `AboutPage` (/sobre/*), `ContactPage` (/contato), `CollectionPage` (/midia,
  /parceiros, /pipeline), `WebPage` (everything else).
- **Blog:** `src/app/midia/db/schema.ts` holds `blogNode(posts)` (the `Blog` on /midia, internal posts
  only - press links are third-party, so claiming them as `blogPost` would misrepresent authorship)
  and `articleNode(post)` (`BlogPosting` on /midia/[slug]). Keep these next to `db/data.ts` so the
  WordPress swap only has to preserve the `MediaPost` shape.
- **People:** `person({...})` + `personId(name, basePath)`. **`worksFor` is only for Aether's own
  people.** External researchers (the CQMED coordinators on /pipeline) get **`affiliation`** instead -
  asserting they work for Aether would be false. `plainText(html, max)` trims bios for `description`.

Validated: every `@type`, property name and property-domain pairing checks out against the official
schema.org vocabulary, no unresolved `@id` references, and all Google-required rich-result fields
(BreadcrumbList / BlogPosting / Organization) are present.

### Other

- **No public phone/e-mail.** The client does not want either published. `Organization.contactPoint`
  points at `/contato` (form only); address is country+region only (no street). **`/contato` itself
  still renders `contact.email` + `contact.phone` and should be revisited.**
- **Images:** optimization is on, sources capped at 2560px, `quality` defaults to 75. The `/sobre`
  hero went 10MB → ~32KB (AVIF, 640w). Don't commit uncompressed originals.
- **On-page SEO (done):** all titles <=60 and descriptions <=160; Twitter cards site-wide; a distinct
  1200x630 OG image per route in `public/img/og/`; heading hierarchy valid on all 15 routes (the
  `( ... )` eyebrows became `<p>`, or `<h2>` where they were a section's only heading); content
  photography has real alt text.

- **`/midia` feed's CSR-bailout is fixed.** `MediaFeed` used to read filter/page state via
  `next/navigation`'s `useSearchParams()`, which forces the whole subtree behind a Suspense boundary
  during static generation - the prerendered HTML shipped with **zero `<a href="/midia/...">` links and
  no post headings** (only the `h1`), since the boundary's fallback was `null`. Giving the fallback real
  content instead turned out to be the wrong fix: React mounted the fallback tree *and* the hydrated
  client tree side by side (verified with a fresh page load in the browser - two `[data-stagger]` grids,
  duplicated cards), not a clean swap. **The actual fix removes `useSearchParams()` entirely**: `MediaFeed`
  now reads `window.location.search` in a `useEffect` (with a `popstate` listener for back/forward) and
  keeps `category`/`page` in local `useState`, defaulting to the unfiltered first page - the same content
  the sitemap/canonical URL already points at - so the component never needs a Suspense boundary and
  SSRs its real content directly. The shared grid markup was extracted into `MediaGrid.tsx` for reuse.
  Verified via the production build's raw static HTML (`next start`, not `next dev`): real per-locale
  `<a href>`/`<h2>` for all posts, no duplication, filtering/pagination/deep-links still work.

- **Still open (not done):** visible breadcrumb UI (the `BreadcrumbList` schema already drives the
  SERP breadcrumb, so this is a UX/nav improvement and a design decision - it would restyle 8 hero
  sections); video poster/`preload`; `priority` on hero images; analytics + Search Console.
  **Deliberately skipped:** `FAQPage`/`HowTo` - Google dropped those rich results for non-government
  sites in 2023, so they'd add markup with no SERP payoff.
