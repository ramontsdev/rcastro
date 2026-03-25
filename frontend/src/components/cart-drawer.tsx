'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/products'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-serif text-xl font-semibold text-foreground">Seu Carrinho</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground mb-6">
                Adicione produtos para continuar comprando
              </p>
              <Button onClick={() => setIsOpen(false)}>
                Explorar Coleção
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedColor}`} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.selectedColor}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">
                        {formatPrice(item.product.priceInCents)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-4 w-4 text-foreground" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-4 w-4 text-foreground" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remover item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-foreground">Subtotal</span>
              <span className="text-lg font-semibold text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Frete calculado no checkout
            </p>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full" size="lg">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
