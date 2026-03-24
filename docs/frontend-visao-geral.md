# Frontend — visão geral

Documentação da aplicação em [`frontend/`](../frontend/) do monorepo `rcastro-store`. Útil para onboarding e alinhamento com o backend e com a marca **RCastro**.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | **Next.js 16** (`next dev` / `next build` / `next start`) |
| UI | **React 19** |
| Linguagem | **TypeScript** |
| Estilo | **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`) |
| Componentes base | **Radix UI** + padrão **shadcn** (variante `new-york`, ver `components.json`) |
| Ícones | **lucide-react** |
| Formulários | **react-hook-form**, **zod**, **@hookform/resolvers** |
| Tema claro/escuro | **next-themes** (componente `theme-provider` presente no projeto) |
| Analytics | **@vercel/analytics** (renderizado no root layout) |

Gerenciador de pacotes no lockfile: **pnpm** (`pnpm-lock.yaml` na raiz do frontend).

## Estrutura de pastas (principais)

```
frontend/
├── public/images/
│   ├── hero-bg.jpg            # Hero da home (não é mockup de SKU)
│   └── products/
│       ├── crochet/           # Um JPG por id de produto crochê (alinhado à vitrine)
│       └── faux-leather-bag/  # Linha couro sintético (aurora, luna, nova, stella)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Metadata via @/lib/site, fontes, CartProvider
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── checkout/page.tsx
│   │   └── produto/[id]/page.tsx
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   └── lib/
│       ├── site.ts            # Nome da marca, descrição SEO, e-mail de contato
│       ├── products.ts        # Catálogo, linhas, filtros
│       └── utils.ts
├── components.json
├── next.config.mjs
├── package.json               # "name": "rcastro-store-frontend"
└── tsconfig.json
```

Existe também `src/styles/globals.css` além de `src/app/globals.css`; o `components.json` aponta o tema Tailwind para **`src/app/globals.css`**.

## Rotas

| URL | Arquivo | Descrição |
|-----|---------|-----------|
| `/` | `src/app/page.tsx` | Landing: Header, Hero, Catálogo, Sobre, Footer |
| `/produto/[id]` | `src/app/produto/[id]/page.tsx` | Página de produto; `generateStaticParams` a partir de `PRODUCTS` |
| `/checkout` | `src/app/checkout/page.tsx` | Checkout com formulário multi-etapa |

Navegação interna na home: `/#colecao`, `/#sobre`, `/#contato`.

## Configuração da marca e SEO

**[`frontend/src/lib/site.ts`](../frontend/src/lib/site.ts)** concentra:

- `siteName`, `siteDescription`, `siteDefaultTitle`, `siteTitleTemplate`, `contactEmail`

O **[`frontend/src/app/layout.tsx`](../frontend/src/app/layout.tsx)** usa `metadata.title` com `default` + `template` (`%s | RCastro`), `description` e `applicationName`. Páginas filhas definem apenas o segmento do título (ex.: `Checkout` → “Checkout | RCastro”). O caso “produto não encontrado” usa `title.absolute` para não duplicar o sufixo.

## `next.config.mjs`

- `typescript.ignoreBuildErrors: true`
- `images.unoptimized: true`

## Fontes (`layout.tsx`)

- **Cormorant Garamond** — `--font-serif`
- **Inter** — `--font-sans`

## Pacote npm

`package.json`: **`"name": "rcastro-store-frontend"`**.

## Ferramentas de qualidade

- Script `lint`: `eslint .` no frontend.
- **Não há ESLint** dedicado dentro de `frontend/`; o backend tem `eslint.config.mjs`.

## Relação com o backend

Loja majoritariamente estática: catálogo em `products.ts`, carrinho em Context, checkout como UI sem API de pagamento documentada aqui.

## Documentos relacionados

- [frontend-dados-e-fluxos.md](./frontend-dados-e-fluxos.md)
- [frontend-marca-e-rcastro.md](./frontend-marca-e-rcastro.md)
