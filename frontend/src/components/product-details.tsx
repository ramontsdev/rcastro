'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { type Product, formatPrice, productLineLabels } from '@/lib/products'
import { ArrowLeft, RefreshCw, Shield, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (product.inStock) {
      addItem(product, selectedColor)
    }
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/#colecao"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a coleção
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary rounded-xl overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="bg-foreground text-background px-6 py-3 text-base font-medium rounded-lg">
                    Esgotado
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <p className="text-sm uppercase tracking-[0.15em] text-accent font-medium">
                {product.category}
              </p>
              <span className="text-xs text-muted-foreground">·</span>
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {productLineLabels[product.line]}
              </p>
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              {product.name}
            </h1>

            <p className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
              {formatPrice(product.priceInCents)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Cor: <span className="text-muted-foreground font-normal">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      px-4 py-2 rounded-lg border text-sm font-medium transition-all
                      ${selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary/50'
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="border-t border-b border-border py-6 mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Edição</span>
                <span className="text-accent font-semibold">{product.edition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Material</span>
                <span className="text-foreground font-medium">{product.material}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dimensões</span>
                <span className="text-foreground font-medium">{product.dimensions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Numeração</span>
                <span className="text-foreground font-medium">Peça numerada internamente</span>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full mb-6"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
            </Button>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-5 w-5 shrink-0" />
                <span>Frete grátis acima de R$ 500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 shrink-0" />
                <span>Garantia de 1 ano</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RefreshCw className="h-5 w-5 shrink-0" />
                <span>Troca em até 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
