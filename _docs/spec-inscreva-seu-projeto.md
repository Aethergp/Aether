# Spec de Conteúdo — `/inscreva-seu-projeto`

**Projeto:** Aether Global Pharma — site institucional
**Página:** Inscreva seu Projeto (formulário em 2 etapas)
**Público deste documento:** cliente e designer
**Status:** rascunho para aprovação

---

## Papel da página

É a página de **conversão** para pesquisadores, startups e empresas com tecnologias de potencial terapêutico. O formato já decidido: duas etapas — identificação primeiro, tecnologia depois — com perguntas abertas e sem jargão excessivo. A página precisa fazer três coisas além do formulário: explicar o que acontece após o envio, reduzir o medo de expor a tecnologia (confidencialidade) e filtrar expectativas (o que a Aether procura).

**Princípio do copy:** quem preenche é pesquisador, não vendedor. As perguntas devem soar como uma conversa científica inicial, não como pitch de negócios.

---

## SEO e metadados

| Campo | Conteúdo |
|---|---|
| **Título (title)** | Inscreva seu Projeto \| Aether Global Pharma |
| **Meta description** | Tem uma tecnologia com potencial terapêutico? Inscreva seu projeto na plataforma Aether: avaliação científica criteriosa, confidencialidade e um caminho até o desenvolvimento farmacêutico global. |
| **URL canônica** | https://www.aethergp.com.br/inscreva-seu-projeto |
| **Imagem OG** | Imagem institucional da página. |

---

## Seção 1 — Abertura

**Copy:**

> **Marcador de seção:** (inscreva seu projeto)
>
> **Título (H1):** Sua pesquisa pode ser o próximo ativo farmacêutico global.
>
> **Texto:** Se você desenvolve uma tecnologia com potencial terapêutico — em universidade, centro de pesquisa, startup ou empresa —, conte para a gente. A inscrição leva poucos minutos, em duas etapas, e toda submissão é avaliada pela equipe científica da plataforma.

---

## Seção 2 — Como funciona (antes do formulário)

**Por que existe:** reduz fricção e ansiedade. Quem vai expor uma tecnologia quer saber o que acontece com a informação.

**Intenção visual:** três passos curtos, horizontais, antes do formulário.

**Copy:**

> **1. Você inscreve** — Duas etapas: seus dados e uma descrição aberta da tecnologia. Anexe um documento de apoio, se tiver.
>
> **2. Nós avaliamos** — A equipe científica analisa o potencial terapêutico, o estágio de maturidade e o cenário de propriedade intelectual.
>
> **3. Conversamos** — Se houver aderência ao modelo da plataforma, entramos em contato para uma conversa aprofundada — com acordo de confidencialidade, quando aplicável.
>
> **Nota de confidencialidade (visível, próxima ao formulário):** Trate esta inscrição como uma apresentação inicial. Não inclua dados experimentais sigilosos, sequências, estruturas ou qualquer informação que comprometa um futuro pedido de patente — esses detalhes serão tratados em etapa posterior, sob acordo de confidencialidade.

*A nota acima é importante de verdade: divulgação prévia pode destruir a novidade de uma patente — exatamente o ativo que a Aether quer proteger. Proteger o proponente dele mesmo é coerente com o posicionamento da empresa.*

---

## Seção 3 — Formulário · Etapa 1 — Identificação

**Intenção visual:** indicador de progresso visível ("Etapa 1 de 2"). Campos em coluna única.

**Campos e microcopy:**

| Campo | Label | Placeholder | Obrigatório |
|---|---|---|---|
| Nome | Nome completo | Seu nome | Sim |
| Instituição | Instituição / Empresa | Universidade, centro de pesquisa ou empresa | Sim |
| Cargo | Cargo / Função | Ex.: pesquisador, professor, fundador | Sim |
| E-mail | E-mail de contato | seu@email.com | Sim |
| Telefone | Telefone | Com DDD (opcional) | Não |
| Localização | País / Estado / Cidade | Ex.: Brasil / SP / Campinas | Sim |

> **Botão:** Continuar →

---

## Seção 4 — Formulário · Etapa 2 — Sobre a tecnologia

**Campos (perguntas abertas, textarea) e microcopy:**

> **1. Resumo da tecnologia**
> Label: Resuma sua tecnologia em um parágrafo curto.
> Microcopy de apoio: Em linguagem livre — o essencial do que ela é e faz.
>
> **2. Problema que resolve**
> Label: Qual problema sua tecnologia resolve?
>
> **3. Limitações atuais**
> Label: Quais limitações ou desafios você enfrenta hoje com a tecnologia?
> Microcopy de apoio: Técnicos, regulatórios, de financiamento — o que estiver travando o avanço.
>
> **4. Diferenciais**
> Label: O que torna sua tecnologia diferente do que já existe?
>
> **5. Upload de arquivo (opcional)**
> Label: Documento de apoio
> Microcopy: Pitch deck, artigo publicado ou resumo executivo. PDF, máximo 15 MB. Lembre-se: nada sigiloso nesta etapa.

**Referência contextual de TRL (sem virar campo obrigatório):** ao lado da pergunta 1 ou 3, um link discreto — "Não sabe em que estágio sua tecnologia está? Conheça os níveis TRL →" (`/pd/trl`).

> **Botões:** ← Voltar · Enviar inscrição

---

## Seção 5 — Mensagens do sistema

> **Sucesso:**
> **Título:** Inscrição enviada com sucesso
> **Texto:** Obrigado por compartilhar seu projeto. Nossa equipe científica fará a avaliação inicial e retornaremos o mais breve possível pelo e-mail informado.
>
> **Erro de envio:**
> **Título:** Erro ao enviar inscrição
> **Texto:** Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente. Se o problema persistir, escreva para [e-mail de contato].
>
> **Validações de campo:**
> - Campo obrigatório vazio: "Este campo é obrigatório."
> - E-mail inválido: "Digite um e-mail válido."
> - Arquivo acima do limite: "O arquivo excede 15 MB. Reduza o tamanho ou envie um resumo."
> - Formato não aceito: "Formato não suportado. Envie um arquivo PDF."

---

## Seção 6 — E-mail de confirmação ao proponente

**Por que existe:** quem envia um projeto e não recebe nada assume que caiu no vazio. Um e-mail automático simples resolve.

**Copy:**

> **Assunto:** Recebemos a inscrição do seu projeto — Aether
>
> **Corpo:** Olá, [nome]. Confirmamos o recebimento da inscrição do seu projeto na plataforma Aether. Nossa equipe científica fará a avaliação inicial e, havendo aderência ao nosso modelo, entraremos em contato por este e-mail. Obrigado por compartilhar sua pesquisa com a gente. — Equipe Aether

---

## Pendências e decisões

**Decidido:**
- Nota de confidencialidade: **entra** conforme redigida (recomendação de revisão jurídica mantida como boa prática, mas não bloqueia).
- Prazo de resposta: sem prazo fixo — usar **"retornaremos o mais breve possível"** nas mensagens de sucesso e no e-mail de confirmação (já refletido nas Seções 5 e 6).

**Em aberto:**
1. **Formatos de arquivo aceitos** — a spec assume apenas PDF (mais seguro e simples). Confirmar se aceita PPT/DOCX.
2. **E-mail de destino das inscrições** — mesmo destino do contato (contato@) ou caixa separada? Decidir na implementação do Resend.
3. **LGPD** — incluir o aviso de tratamento de dados pessoais junto ao formulário; texto a alinhar.
