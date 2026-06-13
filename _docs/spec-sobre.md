# Spec de Conteúdo — `/sobre`

**Projeto:** Aether Global Pharma — site institucional
**Página:** Sobre (hub)
**Público deste documento:** cliente e designer
**Status:** rascunho para aprovação

---

## Papel da página

É a página da **identidade do grupo**. Enquanto a home vende a plataforma e o P&D prova o método, o `/sobre` responde "quem é a Aether e no que ela acredita". É aqui que a essência da marca — Inovação, Espiritualidade, Ousadia — ganha espaço, junto com o contexto completo (os 4 desafios da single page atual) e a distribuição para as três subpáginas: as duas entidades e a equipe.

---

## SEO e metadados

| Campo | Conteúdo |
|---|---|
| **Título (title)** | Sobre a Aether — Inovação, Espiritualidade e Ousadia \| Aether Global Pharma |
| **Meta description** | Conheça a Aether: uma plataforma que une holding de propriedade intelectual e instituto de ciência e tecnologia para transformar pesquisa científica em soluções reais para a saúde. |
| **URL canônica** | https://www.aethergp.com.br/sobre |
| **Imagem OG** | Imagem institucional alinhada à direção fotográfica do manual de marca (natureza, luz, conexão humana). |

---

## Seção 1 — Abertura / Manifesto

**Por que existe:** apresenta a essência da marca. Os textos vêm diretamente do manual de identidade — já aprovados pelo cliente na construção da marca.

**Intenção visual:** abertura contemplativa, com mais respiro do que as demais páginas. Pode usar a direção fotográfica do manual (natureza, texturas orgânicas) como fundo ou apoio.

**Copy:**

> **Marcador de seção:** (sobre a aether)
>
> **Título (H1):** Inovação, Espiritualidade, Ousadia.
>
> **Texto do manifesto:** Com leveza nos negócios e profundidade nas pesquisas, a Aether propõe um novo jeito de atuar no setor farmacêutico: mais humano, mais conectado e mais consciente.
>
> **Complemento (essência):** Nosso propósito é ser o elo entre a pesquisa científica, a indústria e a vida das pessoas. Mais do que desenvolver, acreditamos em traduzir inovação em bem-estar.

---

## Seção 2 — Valores

**Por que existe:** desdobra os três valores do manifesto em significado prático. O manual de marca nomeia os valores, mas não os descreve — os textos abaixo são propostas que precisam de validação do cliente.

**Intenção visual:** três blocos no padrão de cards do site.

**Copy (proposta — validar com o cliente):**

> **Inovação** — Buscamos ciência de fronteira e a conduzimos com método: maturidade tecnológica, governança científica e estratégia regulatória desde o primeiro dia.
>
> **Espiritualidade** — Acreditamos que ciência e propósito caminham juntos. Cada projeto existe para chegar às pessoas — não apenas ao mercado.
>
> **Ousadia** — Atuamos onde o ecossistema falha: na travessia entre a descoberta acadêmica e o ativo farmacêutico global, assumindo a complexidade que outros evitam.

---

## Seção 3 — O contexto completo

**Por que existe:** recebe a versão integral do bloco "contexto" da single page atual, incluindo os 4 desafios do ecossistema (Redução de Risco Tecnológico, Governança Científica e Regulatória, Consolidação de Propriedade Intelectual, Inserção Internacional). A home passa a ter só o resumo; a versão completa vive aqui.

**Copy:** reaproveitar integralmente os textos atuais de `Context.tsx` (título, parágrafo "(o contexto)" e os 4 cards). Já estão aprovados e publicados — nenhuma alteração.

---

## Seção 4 — A plataforma (distribuição para as entidades)

**Por que existe:** apresenta a arquitetura de dois pilares e conduz para as páginas dedicadas. Versão intermediária entre o resumo da home e o conteúdo completo de cada página de entidade.

**Copy:**

> **Marcador de seção:** (a plataforma)
>
> **Título (H2):** Dois pilares institucionais. Uma estratégia integrada.
>
> **Texto:** A plataforma Aether opera por meio de duas entidades complementares, cada uma com funções específicas dentro de um modelo integrado de captura e valorização de propriedade intelectual.
>
> **Card 1 — Aether Global Pharma** (holding de propriedade intelectual)
> **Link:** Conhecer → `/sobre/aether-global-pharma`
>
> **Card 2 — ICT AetherBio+** (instituto de ciência e tecnologia)
> **Link:** Conhecer → `/sobre/ict-aether-bio`

---

## Seção 5 — Linha do tempo

**Por que existe:** história dá lastro institucional — especialmente importante para uma empresa jovem que negocia com indústria e investidores. ⚠️ **Depende integralmente de informações do cliente.**

**Intenção visual:** linha do tempo vertical ou horizontal simples, com ano + marco. Poucos marcos bem escolhidos (4 a 6) valem mais que uma cronologia exaustiva.

**Copy (estrutura a preencher):**

> **Marcador de seção:** (nossa história)
>
> - **[ano]** — Fundação da Aether Global Pharma
> - **[ano]** — Criação do ICT AetherBio+
> - **[ano]** — Primeiras parcerias com [instituições]
> - **2026** — Seleção na chamada Projetos de Alto Impacto em Saúde (Ministério da Saúde + EMBRAPII)

*O marco de 2026 é o único confirmado publicamente. Os demais precisam de datas e descrições do cliente. Se o cliente não fornecer, a seção sai do lançamento — linha do tempo com dois marcos parece improviso.*

---

## Seção 6 — Equipe (teaser)

**Por que existe:** conduz para a página de equipe.

**Copy:**

> **Título (H2):** Pessoas que conectam ciência e estratégia.
>
> **Texto:** A Aether reúne lideranças com experiência em desenvolvimento farmacêutico, propriedade intelectual e gestão científica, apoiadas por um comitê de pesquisadores especialistas em diferentes áreas terapêuticas.
>
> **Botão:** Conheça a equipe → `/sobre/equipe`

---

## Pendências e decisões

**Decidido:**
- Textos dos três valores (Seção 2): **usar como redigidos**, sem rodada extra de validação.

**Em aberto:**
1. **Marcos da linha do tempo** — perguntados no e-mail consolidado à Patricia. Sem isso, a Seção 5 não vai ao ar.
2. **Direção fotográfica** — confirmar se as imagens do manual de marca (banco de imagens) podem ser usadas no site ou se são apenas referência conceitual.
