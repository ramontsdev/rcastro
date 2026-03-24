'use client'

import { useState } from 'react'
import { PRODUCTS, CATEGORIES, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

export function CatalogSection() {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const filteredProducts = getProductsByCategory(selectedCategory)

  return (
    <section id="colecao" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3 font-medium">
            Explore
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Nossa Coleção
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bolsas cuidadosamente selecionadas para mulheres que valorizam qualidade, 
            estilo e sofisticação em cada detalhe.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>
    </section>
  )
}
