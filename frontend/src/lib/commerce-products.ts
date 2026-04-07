import { getApiBaseUrl } from '@/lib/api-base'
import { getProductById, type Product, type ProductLine } from '@/lib/products'

export type ApiProduct = {
  id: string
  slug: string
  name: string
  description: string | null
  line: string
  category: string
  priceCents: number
  currency: string
  stock: number
  active: boolean
  imageUrl: string | null
}

function toLine(raw: string): ProductLine {
  if (raw === 'croche' || raw === 'couro_sintetico') return raw
  return 'croche'
}

function mapApiProductToUi(p: ApiProduct): Product {
  const meta = getProductById(p.slug)

  return {
    id: p.slug,
    name: p.name,
    description: p.description ?? meta?.description ?? '',
    priceInCents: p.priceCents,
    images: [p.imageUrl ?? meta?.images?.[0] ?? '/placeholder.svg'].filter(Boolean),
    category: p.category,
    line: toLine(p.line),
    colors: meta?.colors ?? [],
    material: meta?.material ?? '',
    dimensions: meta?.dimensions ?? '',
    inStock: p.stock > 0,
    edition: meta?.edition ?? '',
  }
}

export async function fetchCommerceProducts(filters?: {
  line?: string
  category?: string
}): Promise<Product[]> {
  const url = new URL(`${getApiBaseUrl()}/api/products`)
  if (filters?.line) url.searchParams.set('line', filters.line)
  if (filters?.category) url.searchParams.set('category', filters.category)

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Falha ao carregar produtos.')
  }

  const data = (await res.json()) as ApiProduct[]
  return data.map(mapApiProductToUi)
}

export async function fetchCommerceProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`${getApiBaseUrl()}/api/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error('Falha ao carregar produto.')
  }

  const data = (await res.json()) as ApiProduct
  return mapApiProductToUi(data)
}

