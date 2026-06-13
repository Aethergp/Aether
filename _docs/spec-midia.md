# Spec de Conteúdo — `/midia`

**Projeto:** Aether Global Pharma — site institucional
**Página:** Mídia (blog)
**Público deste documento:** cliente e designer
**Status:** rascunho para aprovação — estrutura e templates; os posts serão produzidos depois

---

## Papel da página

É o canal editorial da Aether — e o motor de SEO de longo prazo do site. O modelo já decidido é enxuto: **um feed único** que mistura dois tipos de entrada:

- **Post interno** → artigo completo em `/midia/blog/[slug]`
- **Link externo curado** → matéria de terceiros (jornal, estudo, evento), abrindo em nova aba com indicação visual clara de que é conteúdo externo

Sem Press Kit, sem seções paralelas. A curadoria de links externos resolve o problema clássico de blog institucional parado: mesmo sem produzir artigo, a página se mantém viva compartilhando cobertura relevante.

---

## SEO e metadados

| Campo | Conteúdo |
|---|---|
| **Título (title)** | Mídia — Notícias e artigos \| Aether Global Pharma |
| **Meta description** | Acompanhe a Aether: artigos sobre ciência, propriedade intelectual e desenvolvimento farmacêutico, além da cobertura da imprensa sobre a plataforma. |
| **URL canônica** | https://www.aethergp.com.br/midia |
| **Posts internos** | Cada post define title, description e OG próprios (ver template ao final). |

---

## Seção 1 — Abertura

**Copy:**

> **Marcador de seção:** (mídia)
>
> **Título (H1):** Ciência, propriedade intelectual e o caminho até o mercado.
>
> **Texto:** Artigos da equipe Aether e a cobertura da imprensa sobre a plataforma, os projetos e o ecossistema de inovação farmacêutica.

---

## Seção 2 — Feed

**Intenção visual:** lista ou grade de cards em ordem cronológica inversa. Cada card: categoria, data, título, prévia de 1–2 linhas. Cards de link externo recebem um indicador visual (ícone de seta diagonal + nome do veículo) para o leitor saber que sairá do site.

**Estrutura de cada card:**

> **Post interno:** [categoria] · [data] — Título — prévia → `/midia/blog/[slug]`
> **Link externo:** [Na imprensa] · [data] · [veículo] — Título da matéria → URL externa (nova aba)

**Categorias iniciais (poucas, para não esvaziar filtros):**
- Notícias (institucional, anúncios)
- Na imprensa (links externos)
- P&D (artigos sobre ciência, TRL, propriedade intelectual)

---

## Seção 3 — Newsletter (opcional)

**Por que existe:** estava na estrutura aprovada (opt-in de newsletter). ⚠️ Só deve ir ao ar se o cliente assumir o compromisso de enviar algo — caixa de inscrição sem newsletter por trás é passivo, não ativo.

**Copy (se confirmada):**

> **Título:** Receba as novidades da Aether.
> **Campo:** seu e-mail
> **Botão:** Inscrever
> **Microcopy:** Sem spam. Apenas novidades relevantes sobre a plataforma e o ecossistema.

---

## Template — Post interno (`/midia/blog/[slug]`)

Estrutura padrão de cada artigo, para garantir consistência editorial:

> **Categoria** · **Data** · tempo de leitura
> **Título (H1)** — máximo ~70 caracteres (corte do Google)
> **Subtítulo/linha fina** — 1 frase que complementa o título
> **Imagem de capa** — proporção única definida pelo designer, com crédito quando aplicável
> **Corpo** — texto corrido com intertítulos (H2), citações destacadas quando houver
> **Bloco final:** posts relacionados (2–3) + CTA contextual (`/inscreva-seu-projeto` para posts de P&D; `/contato` para institucionais)

**SEO por post:** title próprio, meta description própria (140–160 caracteres), OG image = imagem de capa.

---

## Conteúdo de lançamento (já definido, produção posterior)

1. **Post interno:** "Aether é selecionada em chamada de R$ 90 milhões do Ministério da Saúde e EMBRAPII" — categoria Notícias. Conteúdo-base já levantado na spec do pipeline.
2. **Links externos:** as três matérias da cobertura (EMBRAPII, Folha de S.Paulo, Agenda do Poder) — categoria Na imprensa.

Com essas quatro entradas, o feed nasce vivo.

---

## Pendências com o cliente

1. **Newsletter** — confirmar se existe disposição real de enviar. Se não, a Seção 3 sai.
2. **Ritmo editorial** — definir expectativa mínima (ex.: 1 post interno/mês + curadoria contínua). Sem dono e sem ritmo, o blog envelhece o site em vez de rejuvenescê-lo.
3. **Quem assina os posts** — autoria institucional ("Equipe Aether") ou pessoal (nome do autor)? Recomendação: institucional no início, simplifica.
