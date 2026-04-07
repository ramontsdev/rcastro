import type { MetadataRoute } from 'next'

import { PRODUCTS } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rcastro.com.br'
  const now = new Date()

  return [
    { url: `${base}/`, lastModified: now },
    ...PRODUCTS.map((p) => ({
      url: `${base}/produto/${p.id}`,
      lastModified: now,
    })),
  ]
}

