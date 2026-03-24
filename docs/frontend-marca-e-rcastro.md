# Frontend — marca RCastro

Posicionamento da grife **RCastro** e o que o código reflete hoje.

## Objetivo de negócio

- Marca de **alto status**: bolsas **feitas à mão**, **numeradas**, **edição limitada**.
- Duas linhas no catálogo: **crochê** e **couro sintético premium**.

## O que foi unificado no código

| Área | Implementação |
|------|-----------------|
| Nome e SEO | [`frontend/src/lib/site.ts`](../frontend/src/lib/site.ts) — `siteName`, descrição, título default, template `%s \| RCastro`, `contactEmail` placeholder `contato@rcastro.com.br` |
| Layout | [`layout.tsx`](../frontend/src/app/layout.tsx) — metadata a partir de `site`; removido `generator: v0.app` |
| Checkout / produto | Títulos alinhados ao template RCastro; 404 de produto com `title.absolute` |
| UI | Header, footer, hero, sobre e catálogo com copy de **grife** e menção às duas linhas |
| Pacote npm | `rcastro-store-frontend` |

Eliminadas as identidades legadas **Mãos de Fio** e **Bella Borsa** nesses pontos.

## Catálogo e narrativa

- Dez produtos: seis crochê + quatro couro sintético, com descrições em tom mais **premium** (sem foco único em “boho”).
- Filtros explícitos por **linha** e **silhueta**; badges de linha no card e na ficha.
- Hero usa **`/images/hero-bg.jpg`** (imagem própria do hero, separada dos mockups de produto).

## Itens ainda genéricos ou provisórios

| Item | Nota |
|------|------|
| **E-mail** | `contato@rcastro.com.br` em `site.ts` — trocar quando o domínio estiver definido |
| **Redes sociais** | Footer ainda aponta para `instagram.com` / `facebook.com` genéricos |
| **Assets** | Crochê em `public/images/products/crochet/{id}.jpg`; couro sintético em `products/faux-leather-bag/` — substituir o JPG pelo mesmo `id` para manter vitrine e descrição alinhados |

## Histórico (legado) — antes do rebrand

Antes desta iteração, a UI e metadados misturavam “Mãos de Fio” e “Bella Borsa”, o catálogo era só crochê, e imagens de produto apontavam para paths inexistentes em `public/`. Esse estado está **superado** no código atual; mantemos esta nota só para contexto de evolução.

## Documentos relacionados

- [frontend-visao-geral.md](./frontend-visao-geral.md)
- [frontend-dados-e-fluxos.md](./frontend-dados-e-fluxos.md)
