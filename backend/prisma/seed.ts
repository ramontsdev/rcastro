/**
 * Sincroniza produtos da vitrine (slug = id do frontend) para o PostgreSQL.
 * Execute após `prisma migrate deploy`: `pnpm exec prisma db seed --schema=./prisma/`
 */
import { prismaClient } from '../src/infra/prisma/prismaClient';

const catalog = [
  {
    slug: 'bolsa-tote-croche',
    name: 'Tote Artesanal',
    description: 'Tote em crochê de algodão, estrutura generosa.',
    line: 'croche',
    category: 'Tote',
    priceCents: 119900,
    imageUrl: '/images/products/crochet/bolsa-tote-croche.jpg',
  },
  {
    slug: 'bolsa-crossbody-terracota',
    name: 'Crossbody Terracota',
    description: 'Crossbody em crochê com trama compacta.',
    line: 'croche',
    category: 'Crossbody',
    priceCents: 89900,
    imageUrl: '/images/products/crochet/bolsa-crossbody-terracota.jpg',
  },
  {
    slug: 'bolsa-clutch-delicada',
    name: 'Clutch Rendada',
    description: 'Clutch em crochê com ponto rendado refinado.',
    line: 'croche',
    category: 'Clutch',
    priceCents: 79990,
    imageUrl: '/images/products/crochet/bolsa-clutch-delicada.jpg',
  },
  {
    slug: 'bolsa-satchel-verde',
    name: 'Satchel Jardim',
    description: 'Satchel em crochê com fecho em destaque.',
    line: 'croche',
    category: 'Satchel',
    priceCents: 99900,
    imageUrl: '/images/products/crochet/bolsa-satchel-verde.jpg',
  },
  {
    slug: 'bolsa-bucket-boho',
    name: 'Bucket Riviera',
    description: 'Bucket em crochê com cordão de fechamento.',
    line: 'croche',
    category: 'Bucket',
    priceCents: 94900,
    imageUrl: '/images/products/crochet/bolsa-bucket-boho.jpg',
  },
  {
    slug: 'bolsa-hobo-cream',
    name: 'Hobo Natural',
    description: 'Hobo em crochê de mão macia.',
    line: 'croche',
    category: 'Hobo',
    priceCents: 139900,
    imageUrl: '/images/products/crochet/bolsa-hobo-cream.jpg',
  },
  {
    slug: 'bolsa-aurora-couro',
    name: 'Aurora',
    description: 'Tote estruturada em couro sintético premium.',
    line: 'couro_sintetico',
    category: 'Tote',
    priceCents: 134900,
    imageUrl: '/images/products/faux-leather-bag/bolsa-aurora-1.jpg',
  },
  {
    slug: 'bolsa-luna-couro',
    name: 'Luna',
    description: 'Crossbody em couro sintético.',
    line: 'couro_sintetico',
    category: 'Crossbody',
    priceCents: 112900,
    imageUrl: '/images/products/faux-leather-bag/bolsa-luna-1.jpg',
  },
  {
    slug: 'bolsa-nova-couro',
    name: 'Nova',
    description: 'Clutch rígida em couro sintético.',
    line: 'couro_sintetico',
    category: 'Clutch',
    priceCents: 95900,
    imageUrl: '/images/products/faux-leather-bag/bolsa-nova-1.jpg',
  },
  {
    slug: 'bolsa-stella-couro',
    name: 'Stella',
    description: 'Satchel em couro sintético com aba.',
    line: 'couro_sintetico',
    category: 'Satchel',
    priceCents: 124900,
    imageUrl: '/images/products/faux-leather-bag/bolsa-stella-1.jpg',
  },
] as const;

async function main() {
  for (const p of catalog) {
    await prismaClient.product.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        line: p.line,
        category: p.category,
        priceCents: p.priceCents,
        stock: 50,
        active: true,
        imageUrl: p.imageUrl,
      },
      update: {
        name: p.name,
        description: p.description,
        line: p.line,
        category: p.category,
        priceCents: p.priceCents,
        active: true,
        imageUrl: p.imageUrl,
      },
    });
  }
}

main()
  .then(async () => {
    console.info('Seed de produtos concluído.');
    await prismaClient.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
