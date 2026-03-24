# Frontend — dados e fluxos

Modelo de dados local, catálogo estático e fluxo **home → produto → carrinho → checkout**. Código em [`frontend/src/`](../frontend/src/).

## Fonte de dados

Tudo em **`frontend/src/lib/products.ts`**. Sem CMS no fluxo atual.

## Tipo `Product`

| Campo | Tipo | Uso |
|-------|------|-----|
| `id` | `string` | URL `/produto/{id}` |
| `name` | `string` | Nome exibido |
| `description` | `string` | Ficha e metadata SEO |
| `priceInCents` | `number` | Centavos BRL |
| `images` | `string[]` | Público; card e detalhe usam `images[0]` |
| `category` | `string` | Silhueta (filtro “Silhueta” na home) |
| `line` | `ProductLine` | `'croche'` \| `'couro_sintetico'` |
| `colors` | `string[]` | Cor obrigatória no carrinho |
| `material` | `string` | Ficha |
| `dimensions` | `string` | Ficha |
| `inStock` | `boolean` | Esgotado / adicionar ao carrinho |
| `edition` | `string` | Texto de tiragem limitada |

**`ProductLine`** e rótulos de UI: `productLineLabels`, **`PRODUCT_LINE_OPTIONS`** (`Todas as linhas`, `Crochê`, `Couro sintético`).

## `PRODUCTS` (10 itens)

### Linha crochê (`line: 'croche'`)

Imagens em **`/images/products/crochet/{id}.jpg`**: o nome do ficheiro é o **`id`** do produto no catálogo, para corresponder à ficha e à vitrine. Cada ficheiro é o mockup da silhueta descrita (tote, crossbody, clutch, satchel, bucket, hobo).

| `id` | Ficheiro | `name` |
|------|----------|--------|
| `bolsa-tote-croche` | `bolsa-tote-croche.jpg` | Tote Artesanal |
| `bolsa-crossbody-terracota` | `bolsa-crossbody-terracota.jpg` | Crossbody Terracota |
| `bolsa-clutch-delicada` | `bolsa-clutch-delicada.jpg` | Clutch Rendada |
| `bolsa-satchel-verde` | `bolsa-satchel-verde.jpg` | Satchel Jardim |
| `bolsa-bucket-boho` | `bolsa-bucket-boho.jpg` | Bucket Riviera |
| `bolsa-hobo-cream` | `bolsa-hobo-cream.jpg` | Hobo Natural |

### Linha couro sintético (`line: 'couro_sintetico'`)

Imagens em **`/images/products/faux-leather-bag/`** (`bolsa-*-1.jpg`).

| `id` | `name` | `category` |
|------|--------|------------|
| `bolsa-aurora-couro` | Aurora | Tote |
| `bolsa-luna-couro` | Luna | Crossbody |
| `bolsa-nova-couro` | Nova | Clutch |
| `bolsa-stella-couro` | Stella | Satchel |

## Filtros e helpers

**`CATEGORIES`**: `Todas`, `Tote`, `Crossbody`, `Clutch`, `Satchel`, `Bucket`, `Hobo`

- **`getFilteredProducts(line, category)`** — combina filtro de **linha** (`all` \| `croche` \| `couro_sintetico`) e **silhueta**.
- **`getProductsByCategory(category)`** — mantido; equivale a `getFilteredProducts('all', category)`.
- **`formatPrice`**, **`getProductById`** — inalterados conceitualmente.

## `catalog-section.tsx`

Dois grupos de botões: **Linha** (`PRODUCT_LINE_OPTIONS`) e **Silhueta** (`CATEGORIES`). Mensagem vazia: “Nenhum produto encontrado com esses filtros.”

## `product-card.tsx` / `product-details.tsx`

- Card: badge “Edição limitada” + badge com `productLineLabels[product.line]`.
- Detalhe: linha ao lado da categoria (`· Crochê` / `Couro sintético`).

## Rota de produto

`generateStaticParams` a partir de todos os `PRODUCTS`. `generateMetadata`: `title` = nome do produto (template do layout adiciona `| RCastro`).

## Carrinho e checkout

Comportamento do contexto descrito anteriormente: `CartItem` com `selectedColor`; **`removeItem` / `updateQuantity` por `productId`** podem ser ambíguos se o mesmo SKU existir em duas cores na prática.

Checkout: etapas `cart` → `shipping` → `payment` → `success`; frete grátis se subtotal ≥ R$ 500 (50000 centavos), senão R$ 29,90 (2990).

## Documentos relacionados

- [frontend-visao-geral.md](./frontend-visao-geral.md)
- [frontend-marca-e-rcastro.md](./frontend-marca-e-rcastro.md)
