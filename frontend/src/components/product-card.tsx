'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Product, formatPrice, productLineLabels } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`} className="group block">
      <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
            Edição limitada
          </span>
          <span className="bg-background/90 text-foreground border border-border px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm">
            {productLineLabels[product.line]}
          </span>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded">
              Esgotado
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs text-accent font-medium uppercase tracking-wider">{product.edition}</p>
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors text-balance">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-foreground">
          {formatPrice(product.priceInCents)}
        </p>
      </div>
    </Link>
  )
}
