# Checklist — loja online em produção (RCastro Store)

Documento de leitura para o time: o que **já existe** no repositório e o que **falta** antes de considerar a loja “pronta para produção”. Atualizado após checkout com Stripe + modelos Prisma de e-commerce (março/2026).

---

## Visão geral do que o repositório é hoje

| Parte | Papel atual |
|-------|-------------|
| **Frontend** | Vitrine Next.js: catálogo em [`frontend/src/lib/products.ts`](../frontend/src/lib/products.ts), carrinho em memória ([`cart-context`](../frontend/src/contexts/cart-context.tsx)). Checkout chama **`POST /api/checkout/session`** e redireciona para **Stripe Checkout** ([`create-checkout-session.ts`](../frontend/src/lib/create-checkout-session.ts), [`checkout-form.tsx`](../frontend/src/components/checkout-form.tsx)). Retorno de sucesso: [`/checkout/success`](../frontend/src/app/checkout/success/page.tsx). |
| **Backend** | API Express: **auth** (JWT, e-mail) + **e-commerce** (pedido, pagamento, webhook) com **porta agnóstica** [`IPaymentGateway`](../backend/src/data/protocols/payment/PaymentGateway.ts) e implementação Stripe em [`StripePaymentGateway`](../backend/src/infra/payment/StripePaymentGateway.ts). Entry: [`backend/src/main/server.ts`](../backend/src/main/server.ts). |

Arquitetura de pagamentos: [`docs/pagamentos-arquitetura-agnostica.md`](./pagamentos-arquitetura-agnostica.md).

---

## Prioridade P0 — bloqueadores reais de produção

### Negócio e fluxo de compra

- [x] **Gateway de pagamento: Stripe** com arquitetura agnóstica (`IPaymentGateway` + `infra/`).
- [x] **Catálogo de vendas no PostgreSQL** (Prisma): `Product`, `Order`, `OrderItem`, `Payment`, idempotência de webhook — ver [`Commerce.prisma`](../backend/prisma/models/Commerce.prisma).
- [x] **Fluxo ponta a ponta (criação de sessão + webhook)** — configurar `STRIPE_*`, URLs de sucesso/cancelamento e `DATABASE_URL` em produção; aplicar migrações e seed.
- [x] **E-mail de confirmação de pedido** após webhook de pagamento confirmado (SES + template [`orderPaidConfirmationEmailTemplate.ts`](../backend/src/presentation/helpers/emailTemplates/orderPaidConfirmationEmailTemplate.ts); falha de envio é registada em log e **não** falha o webhook).
- [ ] **AWS SES em produção**: domínio/e-mail verificados, quotas e `APP_EMAIL` / `EMAIL_FROM` alinhados ao remetente permitido.
- [x] **Não processar cartão no nosso frontend** — dados de cartão só na Stripe; formulário simulado foi removido.
- [x] **Decremento de estoque** no sucesso do pagamento (lógica no repositório commerce ao processar webhook — validar regras de negócio e estoque inicial via seed).

### Frontend — qualidade e segurança do build

- [x] **Typecheck no build** — `ignoreBuildErrors` removido de [`frontend/next.config.mjs`](../frontend/next.config.mjs); `next build` executa **Running TypeScript**. Script local: `pnpm typecheck` no frontend.
- [ ] **Reavaliar `images.unoptimized: true`** — em produção costuma-se usar o pipeline de imagens do Next (ou CDN) para performance e LCP.

### Backend — build e runtime

- [x] **`prisma generate` no CI** — o workflow [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) corre `pnpm prisma:generate` antes de lint/typecheck. Replicar o mesmo passo no deploy antes de `tsc` / `build`.
- [ ] **Migrações em produção**: `prisma migrate deploy` (ou equivalente) com `DATABASE_URL` do ambiente.
- [x] **Ordem do error handler no Express** — middleware global **depois** das rotas em [`server.ts`](../backend/src/main/server.ts).
- [x] **Tratamento de erros nas rotas** — [`expressRouteAdapter.ts`](../backend/src/main/adapters/express/expressRouteAdapter.ts) com `try/catch` e `next(error)`.

### CORS e ambiente

- [x] **CORS para browser** — [`expressCorsAdapter.ts`](../backend/src/main/adapters/express/expressCorsAdapter.ts): origens em `ALLOWED_ORIGINS` (lista separada por vírgulas, **trim**), resposta **204** a **`OPTIONS`** (preflight), métodos e headers explícitos para `POST` + JSON.
- [ ] **Alinhar `ALLOWED_ORIGINS`** no deploy (URL exata do frontend; sem barra final se o browser enviar sem).
- [ ] **Secrets fortes**: `JWT_SECRET`, credenciais AWS, `STRIPE_*`, `DATABASE_URL` apenas via secret manager / variáveis do provedor, nunca no repositório.

---

## Prioridade P1 — forte recomendação antes ou logo após o go-live

### Segurança e robustez (backend)

- [x] **Rate limiting** — [`expressRateLimiters.ts`](../backend/src/main/middlewares/expressRateLimiters.ts) + `express-rate-limit` em `/api/sign-in`, `/sign-up`, `/confirm-email`, `/forgot-password`, `/reset-password`, `/resend-verification-code`, `/api/checkout/session`, `GET /api/me`. **`POST /api/webhooks/payment` sem limite** (Stripe e reenvios). Em produção atrás de proxy, definir `TRUST_PROXY=1` (ver [`backend/.env.example`](../backend/.env.example)).
- [x] **Headers de segurança** — [`expressHelmetAdapter.ts`](../backend/src/main/adapters/express/expressHelmetAdapter.ts) (Helmet: CSP desligado para API JSON, CORP compatível com CORS). Reforçar no edge (CDN) em produção se fizer sentido.
- [ ] **Logs estruturados** + **correlação de request** (request id).
- [ ] **Observabilidade**: APM/erros; `GET /health` para probes.

### Loja (frontend) — confiança e SEO

- [ ] **Páginas legais reais**: substituir links `href="/#"` no [`footer.tsx`](../frontend/src/components/footer.tsx).
- [ ] **`robots.txt` / `sitemap`** no Next.
- [ ] **Open Graph / Twitter cards** (`metadata.openGraph`).
- [x] **Remover número de pedido fictício `#BB...`** no fluxo antigo — sucesso passou para página dedicada; confirmação real depende de e-mail/backend.
- [ ] **Busca no header** — implementar ou ocultar.

### Conteúdo e marca

- [ ] **E-mail e redes** em [`site.ts`](../frontend/src/lib/site.ts) e footer — apontar para canais reais.
- [ ] **Imagens finais** por SKU — [`docs/frontend-dados-e-fluxos.md`](./frontend-dados-e-fluxos.md).

### Deploy e operações

- [x] **CI (GitHub Actions)** — [`.github/workflows/ci.yml`](../.github/workflows/ci.yml): backend (`prisma generate`, ESLint, `tsc`); frontend (`tsc`, `next build`). **Testes** automatizados continuam em aberto.
- [ ] **Docker / compose**: alinhar scripts com ficheiros versionados.
- [ ] **Dois deploys coordenados**: frontend + backend + Postgres + SES; `NEXT_PUBLIC_API_BASE_URL` apontando para a API pública.
- [ ] **Domínio e HTTPS**, HSTS no edge.

### LGPD / compliance (Brasil)

- [ ] Política de privacidade e bases legais.
- [ ] Fluxo de dados no checkout alinhado à política.
- [ ] Retenção e exclusão (direito do titular).

---

## Prioridade P2 — melhorias e dívida técnica

- [ ] **Testes automatizados** (checkout feliz, webhook idempotente).
- [ ] **Carrinho**: `removeItem` / `updateQuantity` por `productId` ambíguos com mesma peça em cores diferentes — ver [`docs/frontend-dados-e-fluxos.md`](./frontend-dados-e-fluxos.md).
- [ ] **`app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx`** no Next.
- [ ] **Acessibilidade**: drawer, seleção de cor, etc.
- [x] **README do backend** alinhado com o monorepo — introdução, e-commerce e caminhos atualizados em [`backend/README.md`](../backend/README.md).
- [x] **Loja + auth (fluxo principal)** — login em `/entrar` (JWT em `localStorage`), `GET /api/me`, header com sessão, checkout pré-preenche nome/e-mail e envia `Authorization` opcional ao criar sessão Stripe. **Convidado** continua possível. Falta: **registo no site**, associar `userId` ao `Order` no backend, recuperação de senha na UI.

---

## Checklist rápido “só vitrine no ar” (sem venda real)

Se desligarem temporariamente a API ou Stripe:

- [ ] Ocultar ou desativar o botão que chama a API; copy “em breve” / WhatsApp.
- [ ] Manter itens P0 de **build TS** e **imagens** quando possível.

---

## Referências internas

- Pagamentos: [`docs/pagamentos-arquitetura-agnostica.md`](./pagamentos-arquitetura-agnostica.md)
- Frontend: [`docs/frontend-visao-geral.md`](./frontend-visao-geral.md), [`docs/frontend-dados-e-fluxos.md`](./frontend-dados-e-fluxos.md)
- Backend env exemplo: [`backend/.env.example`](../backend/.env.example) — frontend: [`frontend/.env.example`](../frontend/.env.example)

---

*Revisar após cada milestone (e-mail pós-compra, CI, produção).*
