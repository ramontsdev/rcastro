export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images: string[]
  category: string
  colors: string[]
  material: string
  dimensions: string
  inStock: boolean
  edition: string // Edição limitada - ex: "Edição de 12 peças"
}

export const PRODUCTS: Product[] = [
  {
    id: 'bolsa-tote-croche',
    name: 'Tote Artesanal',
    description: 'Bolsa tote em crochê feita à mão com fio de algodão natural. Perfeita para o dia a dia, espaçosa e com estilo boho único. Cada peça é numerada internamente.',
    priceInCents: 119900,
    images: ['/images/tote-classic.jpg'],
    category: 'Tote',
    colors: ['Natural', 'Bege', 'Areia'],
    material: 'Fio de Algodão 100%',
    dimensions: '35cm x 30cm x 15cm',
    inStock: true,
    edition: 'Edição limitada de 15 peças',
  },
  {
    id: 'bolsa-crossbody-terracota',
    name: 'Crossbody Terracota',
    description: 'Bolsa transversal em crochê com detalhes de macramê. Compacta e charmosa, ideal para passeios e festivais. Numeração exclusiva na parte interna.',
    priceInCents: 89900,
    images: ['/images/crossbody-milano.jpg'],
    category: 'Crossbody',
    colors: ['Terracota', 'Mostarda', 'Ferrugem'],
    material: 'Fio de Algodão Colorido',
    dimensions: '22cm x 16cm x 8cm',
    inStock: true,
    edition: 'Edição limitada de 20 peças',
  },
  {
    id: 'bolsa-clutch-delicada',
    name: 'Clutch Rendada',
    description: 'Clutch delicada em crochê com ponto rendado. Perfeita para ocasiões especiais com um toque artesanal e romântico. Peça numerada e única.',
    priceInCents: 79990,
    images: ['/images/clutch-soiree.jpg'],
    category: 'Clutch',
    colors: ['Rosa Blush', 'Branco', 'Lavanda'],
    material: 'Linha de Algodão Fina',
    dimensions: '25cm x 12cm x 5cm',
    inStock: true,
    edition: 'Edição limitada de 10 peças',
  },
  {
    id: 'bolsa-satchel-verde',
    name: 'Satchel Jardim',
    description: 'Bolsa estruturada em crochê verde sálvia com fecho de botão de madeira. Estilo vintage com alma artesanal. Numeração exclusiva bordada.',
    priceInCents: 99900,
    images: ['/images/satchel-paris.jpg'],
    category: 'Satchel',
    colors: ['Verde Sálvia', 'Verde Oliva', 'Menta'],
    material: 'Fio de Algodão com Botão de Madeira',
    dimensions: '28cm x 22cm x 12cm',
    inStock: true,
    edition: 'Edição limitada de 12 peças',
  },
  {
    id: 'bolsa-bucket-boho',
    name: 'Bucket Boho',
    description: 'Bolsa saco em crochê com franjas estilo boho. Fechamento em cordão, perfeita para looks descontraídos e festivais. Peça numerada à mão.',
    priceInCents: 94900,
    images: ['/images/bucket-boho.jpg'],
    category: 'Bucket',
    colors: ['Mostarda', 'Terracota', 'Creme'],
    material: 'Fio de Algodão com Franjas',
    dimensions: '26cm x 28cm x 18cm',
    inStock: true,
    edition: 'Edição limitada de 18 peças',
  },
  {
    id: 'bolsa-hobo-cream',
    name: 'Hobo Natural',
    description: 'Bolsa hobo em crochê com pontos elaborados. Macia e confortável, se adapta ao corpo com elegância natural. Certificado de autenticidade numerado.',
    priceInCents: 139900,
    images: ['/images/hobo-luxe.jpg'],
    category: 'Hobo',
    colors: ['Off-White', 'Creme', 'Bege'],
    material: 'Fio de Algodão Macio',
    dimensions: '40cm x 32cm x 8cm',
    inStock: true,
    edition: 'Edição limitada de 8 peças',
  },
]

export const CATEGORIES = ['Todas', 'Tote', 'Crossbody', 'Clutch', 'Satchel', 'Bucket', 'Hobo']

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'Todas') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}
