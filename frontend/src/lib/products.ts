export type ProductLine = 'croche' | 'couro_sintetico'

export type ProductLineFilter = 'all' | ProductLine

export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images: string[]
  category: string
  line: ProductLine
  colors: string[]
  material: string
  dimensions: string
  inStock: boolean
  edition: string
}

export const productLineLabels: Record<ProductLine, string> = {
  croche: 'Crochê',
  couro_sintetico: 'Couro sintético',
}

export const PRODUCT_LINE_OPTIONS: { value: ProductLineFilter; label: string }[] = [
  { value: 'all', label: 'Todas as linhas' },
  { value: 'croche', label: 'Crochê' },
  { value: 'couro_sintetico', label: 'Couro sintético' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'bolsa-tote-croche',
    name: 'Tote Artesanal',
    description:
      'Tote em crochê de algodão, estrutura generosa e acabamento de grife. Ideal para o dia a dia com presença discreta. Cada unidade é numerada no interior.',
    priceInCents: 119900,
    images: ['/images/products/crochet/bolsa-tote-croche.jpg'],
    category: 'Tote',
    line: 'croche',
    colors: ['Natural', 'Bege', 'Areia'],
    material: 'Fio de algodão 100%',
    dimensions: '35cm x 30cm x 15cm',
    inStock: true,
    edition: 'Edição limitada de 15 peças',
  },
  {
    id: 'bolsa-crossbody-terracota',
    name: 'Crossbody Terracota',
    description:
      'Crossbody em crochê com trama compacta e alça ajustável. Silhueta leve para transitar entre compromissos com elegância. Numeração exclusiva na forração.',
    priceInCents: 89900,
    images: ['/images/products/crochet/bolsa-crossbody-terracota.jpg'],
    category: 'Crossbody',
    line: 'croche',
    colors: ['Terracota', 'Mostarda', 'Ferrugem'],
    material: 'Fio de algodão colorido',
    dimensions: '22cm x 16cm x 8cm',
    inStock: true,
    edition: 'Edição limitada de 20 peças',
  },
  {
    id: 'bolsa-clutch-delicada',
    name: 'Clutch Rendada',
    description:
      'Clutch em crochê com ponto rendado refinado. Pensada para eventos e jantares, com fechamento seguro e presença de joia têxtil. Peça numerada.',
    priceInCents: 79990,
    images: ['/images/products/crochet/bolsa-clutch-delicada.jpg'],
    category: 'Clutch',
    line: 'croche',
    colors: ['Rosa Blush', 'Branco', 'Lavanda'],
    material: 'Linha de algodão fina',
    dimensions: '25cm x 12cm x 5cm',
    inStock: true,
    edition: 'Edição limitada de 10 peças',
  },
  {
    id: 'bolsa-satchel-verde',
    name: 'Satchel Jardim',
    description:
      'Satchel em crochê com fecho em destaque e silhueta estruturada. Equilíbrio entre rigor e textura artesanal. Numeração bordada no forro.',
    priceInCents: 99900,
    images: ['/images/products/crochet/bolsa-satchel-verde.jpg'],
    category: 'Satchel',
    line: 'croche',
    colors: ['Verde Sálvia', 'Verde Oliva', 'Menta'],
    material: 'Fio de algodão com fecho metálico',
    dimensions: '28cm x 22cm x 12cm',
    inStock: true,
    edition: 'Edição limitada de 12 peças',
  },
  {
    id: 'bolsa-bucket-boho',
    name: 'Bucket Riviera',
    description:
      'Bucket em crochê com cordão de fechamento e volume controlado. Perfil contemporâneo para quem prefere forma e movimento. Certificado numerado.',
    priceInCents: 94900,
    images: ['/images/products/crochet/bolsa-bucket-boho.jpg'],
    category: 'Bucket',
    line: 'croche',
    colors: ['Mostarda', 'Terracota', 'Creme'],
    material: 'Fio de algodão',
    dimensions: '26cm x 28cm x 18cm',
    inStock: true,
    edition: 'Edição limitada de 18 peças',
  },
  {
    id: 'bolsa-hobo-cream',
    name: 'Hobo Natural',
    description:
      'Hobo em crochê de mão macia, assentamento fluido ao corpo. Volumetria generosa com leveza visual. Peça numerada e acompanhada de certificado.',
    priceInCents: 139900,
    images: ['/images/products/crochet/bolsa-hobo-cream.jpg'],
    category: 'Hobo',
    line: 'croche',
    colors: ['Off-White', 'Creme', 'Bege'],
    material: 'Fio de algodão macio',
    dimensions: '40cm x 32cm x 8cm',
    inStock: true,
    edition: 'Edição limitada de 8 peças',
  },
  {
    id: 'bolsa-aurora-couro',
    name: 'Aurora',
    description:
      'Tote estruturada em couro sintético premium, cortes limpos e alças reforçadas. Acabamento artesanal com costura aparente controlada. Tiragem numerada.',
    priceInCents: 134900,
    images: ['/images/products/faux-leather-bag/bolsa-aurora-1.jpg'],
    category: 'Tote',
    line: 'couro_sintetico',
    colors: ['Preto', 'Café', 'Noz'],
    material: 'Couro sintético premium (PU)',
    dimensions: '36cm x 28cm x 14cm',
    inStock: true,
    edition: 'Edição limitada de 14 peças',
  },
  {
    id: 'bolsa-luna-couro',
    name: 'Luna',
    description:
      'Crossbody em couro sintético com ferragens discretas e curvatura contemporânea. Leveza e funcionalidade para uso urbano. Numeração no interior.',
    priceInCents: 112900,
    images: ['/images/products/faux-leather-bag/bolsa-luna-1.jpg'],
    category: 'Crossbody',
    line: 'couro_sintetico',
    colors: ['Preto', 'Café', 'Caramelo'],
    material: 'Couro sintético premium (PU)',
    dimensions: '24cm x 18cm x 9cm',
    inStock: true,
    edition: 'Edição limitada de 16 peças',
  },
  {
    id: 'bolsa-nova-couro',
    name: 'Nova',
    description:
      'Clutch rígida em couro sintético com fecho magnético e silhueta minimalista. Proposta noturna com DNA de grife. Cada exemplar é único na série.',
    priceInCents: 95900,
    images: ['/images/products/faux-leather-bag/bolsa-nova-1.jpg'],
    category: 'Clutch',
    line: 'couro_sintetico',
    colors: ['Preto', 'Vinho', 'Off-white'],
    material: 'Couro sintético premium (PU)',
    dimensions: '26cm x 14cm x 5cm',
    inStock: true,
    edition: 'Edição limitada de 12 peças',
  },
  {
    id: 'bolsa-stella-couro',
    name: 'Stella',
    description:
      'Satchel em couro sintético com aba e alça de ombro removível. Estrutura firme e compartimentos organizados. Edição restrita com placa numerada.',
    priceInCents: 124900,
    images: ['/images/products/faux-leather-bag/bolsa-stella-1.jpg'],
    category: 'Satchel',
    line: 'couro_sintetico',
    colors: ['Preto', 'Café', 'Taupe'],
    material: 'Couro sintético premium (PU)',
    dimensions: '30cm x 22cm x 11cm',
    inStock: true,
    edition: 'Edição limitada de 10 peças',
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

export function getFilteredProducts(line: ProductLineFilter, category: string): Product[] {
  let list = PRODUCTS
  if (line !== 'all') {
    list = list.filter((p) => p.line === line)
  }
  if (category === 'Todas') return list
  return list.filter((p) => p.category === category)
}

/** @deprecated Prefira getFilteredProducts para combinar linha e categoria. */
export function getProductsByCategory(category: string): Product[] {
  return getFilteredProducts('all', category)
}
