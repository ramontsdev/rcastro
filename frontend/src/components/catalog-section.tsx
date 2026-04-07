'use client'

import { useState } from 'react'
import {
  CATEGORIES,
  PRODUCT_LINE_OPTIONS,
  type ProductLineFilter,
  type Product,
} from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

export function CatalogSection({ products }: { products: Product[] }) {
  const [selectedLine, setSelectedLine] = useState<ProductLineFilter>('all')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  let filteredProducts = products
  if (selectedLine !== 'all') {
    filteredProducts = filteredProducts.filter((p) => p.line === selectedLine)
  }
  if (selectedCategory !== 'Todas') {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory)
  }

  return (
    <section id="colecao" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3 font-medium">
            Explore
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Nossa coleção
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Linha crochê e linha couro sintético: silhuetas pensadas para o cotidiano e ocasiões especiais,
            sempre em edição limitada e com numeração exclusiva.
          </p>
        </div>

        {/* Line filter */}
        <div className="mb-6">
          <p className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Linha
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PRODUCT_LINE_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant={selectedLine === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLine(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-12">
          <p className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Silhueta
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="min-w-[80px]"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado com esses filtros.
          </p>
        )}
      </div>
    </section>
  )
}
