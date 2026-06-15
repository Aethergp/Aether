# Spec de Conteúdo — `/contato`

**Projeto:** Aether Global Pharma — site institucional
**Página:** Contato
**Público deste documento:** cliente e designer
**Status:** rascunho para aprovação

---

## Papel da página

Página de conversão para o público **institucional**: indústria, investidores, universidades, imprensa. A novidade em relação à single page é a **segmentação por assunto** — um seletor que diz à Aether quem está falando, melhora a triagem interna e, de quebra, redireciona pesquisadores para o canal certo (o formulário de inscrição) antes de eles escreverem mensagem genérica aqui.

---

## SEO e metadados

| Campo | Conteúdo |
|---|---|
| **Título (title)** | Contato \| Aether Global Pharma |
| **Meta description** | Fale com a Aether Global Pharma: parcerias científicas, licenciamento, investimento, imprensa e colaborações institucionais. |
| **URL canônica** | https://www.aethergp.com.br/contato |
| **Imagem OG** | Imagem institucional da página. |

---

## Seção 1 — Abertura

**Copy (adaptada da versão atual):**

> **Marcador de seção:** (contato)
>
> **Título (H1):** Entre em contato para oportunidades de parceria científica, desenvolvimento tecnológico ou colaboração institucional.

---

## Seção 2 — Redirecionamento para pesquisadores

**Por que existe:** evita que inscrições de projeto cheguem pelo formulário errado. Um aviso curto e amigável antes do formulário.

**Copy:**

> **Box de destaque:** É pesquisador e quer apresentar uma tecnologia? Use nosso formulário dedicado — sua proposta chega direto à equipe científica.
> **Link:** Inscreva seu projeto → `/inscreva-seu-projeto`

---

## Seção 3 — Formulário

**Campos e microcopy:**

| Campo | Label | Tipo | Obrigatório |
|---|---|---|---|
| Nome | Nome | texto · placeholder "Nome completo" | Sim |
| E-mail | E-mail | email · placeholder "Email" | Sim |
| Empresa/Instituição | Empresa / Instituição | texto (opcional) | Não |
| Assunto | Assunto | seletor | Sim |
| Mensagem | Mensagem | textarea | Sim |

**Opções do seletor de assunto:**

> - Parceria científica ou institucional
> - Licenciamento e negócios
> - Investimento
> - Imprensa
> - Outros assuntos

*O assunto escolhido entra no e-mail interno (campo no corpo e, idealmente, no título do e-mail), facilitando a triagem.*

**Mensagens do sistema (mantidas do padrão atual):**

> **Sucesso:** Mensagem enviada com sucesso — Obrigado por entrar em contato. Entraremos em contato o mais breve possível.
> **Erro:** Erro ao enviar mensagem — Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.

---

## Seção 4 — Contatos diretos

**Por que existe:** nem todo mundo quer formulário — investidor e jornalista preferem e-mail direto.

**Copy (estrutura — dados a confirmar):**

> **E-mail:** contato@aethergp.com.br ✅ decidido
> *Nota de implementação (Flávio): o endereço precisa ser criado — sugestão: Cloudflare Email Routing encaminhando contato@ para a caixa real da Patricia. Fazer junto com a configuração do Resend.*
>
> **Telefone:** ⟨ TEMPORÁRIO ⟩ +55 (41) 99698-0730 — placeholder até a Patricia confirmar o definitivo.
>
> **Endereço:** ⟨ TEMPORÁRIO ⟩ Rua José Casemiro Stenzowski, 21D — Novo Mundo — CEP 81010-370 — Curitiba/PR. Usado também, por ora, para a filial. A Patricia está negociando a mudança das duas Aethers para parques tecnológicos (sede em Curitiba, filial em Campinas/SP) — endereços reais ~2 meses.
>
> **Mapa:** Google Maps embutido na página (aponta para o endereço temporário acima).
>
> **Redes sociais:** Instagram → @aetherglobalpharma

---

## Pendências e decisões

**Decidido:**
- E-mail público: **contato@aethergp.com.br** (criar via Cloudflare Email Routing — tarefa de implementação).
- Seletor de assuntos: **confirmado** com as cinco opções propostas.

**Atualização do cliente (resposta por e-mail, 06/2026):**
- Endereço/telefone/e-mail: Patricia concorda em exibir, **mas** depende da negociação em curso (mudança para parques tecnológicos — sede em Curitiba, filial em Campinas). Estima ~2 meses. Por ora o site usa **valores temporários** (placeholder) e troca quando ela confirmar.

**Em aberto:**
1. **Endereço e telefone reais** — aguardando o fim da negociação dos parques tecnológicos (~2 meses). Hoje o site mostra placeholder (mesmo endereço para sede e filial) + Google Maps; trocar quando vierem os definitivos.
2. **Destino dos e-mails por assunto** — tudo numa caixa só ou triagem por destinatário (decidir na implementação do Resend).
