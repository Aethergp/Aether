# Índice das Specs de Conteúdo — Site Aether

**Atualizado em:** 06/2026 (inclui as respostas da Patricia ao e-mail consolidado)

| # | Página | Arquivo | Status |
|---|---|---|---|
| 1 | Home | `spec-home.md` | 🟢 fechada (CTA do hero muda; vídeo do banner mantido) |
| 2 | `/sobre` (hub) | `spec-sobre.md` | 🟢 linha do tempo confirmada (2000 Bap Consult / 2025 rebrand + ICT / 2026 MS-EMBRAPII); falta só direção fotográfica |
| 3 | `/sobre/aether-global-pharma` | `spec-sobre-aether-global-pharma.md` | 🟢 fechada (modelo 4 etapas: Patricia revisa no design) |
| 4 | `/sobre/ict-aether-bio` | `spec-sobre-ict-aether-bio.md` | 🟡 ICT fundado 2025; projetos divulgáveis (MS/EMBRAPII público); comitê aguarda alinhamento jurídico c/ pesquisadores |
| 5 | `/sobre/equipe` | `spec-sobre-equipe.md` | 🟡 página confirmada pela Patricia; aguardando foto aprovada + comitê (alinhamento jurídico) |
| 6 | `/pd` (hub) | *(entregue anteriormente)* | ✅ pronta |
| 7 | `/pd/trl` | *(entregue anteriormente)* | ✅ pronta |
| 8 | `/pd/pipeline` | `spec-pd-pipeline.md` | 🟡 projeto MS/EMBRAPII é público (pode começar); detalhes técnicos/TRL e demais projetos ainda pendentes |
| 9 | ~~`/pd/areas`~~ | — | ❌ **CORTADA** (decisão 11/06) — remover do menu e do sitemap |
| 10 | `/midia` | `spec-midia.md` | 🟢 fechada (sem newsletter no lançamento; autoria institucional; posts depois) |
| 11 | `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | 🟢 fechada (nota de confidencialidade entra; "retornaremos o mais breve possível") |
| 12 | `/contato` | `spec-contato.md` | 🟢 **construída** — usa endereço/telefone TEMPORÁRIOS + Google Maps; reais ~2 meses (mudança p/ parques tecnológicos) |

---

## Decisões tomadas em 11/06

- Cargo da Patricia: **CEO & Fundadora**
- Bio e realizações: publicar como redigidas; revisão da Patricia direto no design
- Foto: LinkedIn + tratamento IA como solução de lançamento ⚠️ (com aprovação explícita dela; sessão fotográfica recomendada pós-launch)
- `/pd/areas`: **cortada**
- Textos dos valores: usar como redigidos
- Grafia: **"Aether Bio+"** (atualizar em todo o site; confirmar espaço antes do "+")
- Comitê científico: nomes serão publicados (aguardando lista + autorizações individuais)
- E-mail público: **contato@aethergp.com.br** (criar via Cloudflare Email Routing)
- Seletor de assuntos no contato: confirmado
- Nota de confidencialidade no formulário: entra
- Prazo de resposta: "retornaremos o mais breve possível"
- Newsletter: **fora do lançamento**
- Autoria dos posts: institucional ("Equipe Aether")

## Respostas da Patricia (e-mail, 06/2026)

- **Fundação:** empresa nasce em **2000** como **Bap Consult**; razão social alterada para **Aether Global Pharma** em **2025** (fundadora no Canadá).
- **ICT AetherBio+:** fundado em **2025** — novo, para complementar a gestão de pesquisas.
- **Equipe:** quer **manter a área** ("traz seriedade"), mas vai **alinhar juridicamente com os pesquisadores** antes de incluí-los.
- **Endereço/telefone/e-mail:** concorda em exibir, mas depende da **negociação dos parques tecnológicos** (sede Curitiba + filial Campinas, ~2 meses). Site usa **placeholder temporário** por ora.
- **Projetos do ICT:** o do **Ministério da Saúde / EMBRAPII é público** (link de notícias enviado); há **novas publicações no LinkedIn**. Onde não puder detalhar, focar em TRL/P&D.

## Ainda aguardando Patricia

1. Restrições contratuais de comunicação / estágio TRL publicável / descrição técnica do projeto EMBRAPII (A1–A3) — necessários para detalhar `/pd/pipeline`.
2. Ativos anonimizados adicionais para o pipeline (B1).
3. Lista do comitê científico (nome, titulação, área, instituição + autorizações) — **após o alinhamento jurídico** que ela fará com os pesquisadores (D1).
4. Endereço e telefone **definitivos** (E1) — após a mudança para os parques tecnológicos (~2 meses). Endereço do Canadá também a confirmar.
5. Direção fotográfica — imagens do manual podem ser usadas no site?

## Tarefas de implementação derivadas (Flávio)

- Criar contato@aethergp.com.br (Cloudflare Email Routing → caixa da Patricia)
- Configurar Resend no codebase (contato + inscrição com anexo 15MB)
- Atualizar grafia "Aether Bio+" nos componentes existentes
- Remover `/pd/areas` de qualquer rascunho de menu/sitemap
