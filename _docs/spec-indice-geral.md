# Índice das Specs de Conteúdo — Site Aether

**Atualizado em:** 11/06/2026 (pós-decisões da rodada com Flávio)

| # | Página | Arquivo | Status |
|---|---|---|---|
| 1 | Home | `spec-home.md` | 🟢 fechada (CTA do hero muda; vídeo do banner mantido) |
| 2 | `/sobre` (hub) | `spec-sobre.md` | 🟡 aguardando linha do tempo (Patricia) |
| 3 | `/sobre/aether-global-pharma` | `spec-sobre-aether-global-pharma.md` | 🟢 fechada (modelo 4 etapas: Patricia revisa no design) |
| 4 | `/sobre/ict-aether-bio` | `spec-sobre-ict-aether-bio.md` | 🟡 aguardando lista do comitê científico |
| 5 | `/sobre/equipe` | `spec-sobre-equipe.md` | 🟡 perfil da Patricia definido; aguardando foto final aprovada |
| 6 | `/pd` (hub) | *(entregue anteriormente)* | ✅ pronta |
| 7 | `/pd/trl` | *(entregue anteriormente)* | ✅ pronta |
| 8 | `/pd/pipeline` | `spec-pd-pipeline.md` | 🟡 aguardando respostas EMBRAPII (restrições, TRL, descrição técnica) |
| 9 | ~~`/pd/areas`~~ | — | ❌ **CORTADA** (decisão 11/06) — remover do menu e do sitemap |
| 10 | `/midia` | `spec-midia.md` | 🟢 fechada (sem newsletter no lançamento; autoria institucional; posts depois) |
| 11 | `/inscreva-seu-projeto` | `spec-inscreva-seu-projeto.md` | 🟢 fechada (nota de confidencialidade entra; "retornaremos o mais breve possível") |
| 12 | `/contato` | `spec-contato.md` | 🟡 aguardando endereço/telefone (Patricia) |

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

## Aguardando Patricia (e-mail consolidado enviado)

1. Restrições contratuais de comunicação do projeto EMBRAPII (A1)
2. Estágio TRL do projeto — publicável? qual? (A2)
3. Validação da descrição "plataforma produtiva para IFA anti-inflamatória" (A3)
4. Ativos anonimizados adicionais para o pipeline (B1)
5. Marcos da linha do tempo (C1)
6. Lista do comitê científico: nome, titulação, área, instituição + autorizações (D1 — reformular pergunta: pedir a lista, não permissão)
7. Endereço e telefone para a página de contato (E1)

## Tarefas de implementação derivadas (Flávio)

- Criar contato@aethergp.com.br (Cloudflare Email Routing → caixa da Patricia)
- Configurar Resend no codebase (contato + inscrição com anexo 15MB)
- Atualizar grafia "Aether Bio+" nos componentes existentes
- Remover `/pd/areas` de qualquer rascunho de menu/sitemap
