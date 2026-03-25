'use client'

import React from "react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/products'
import { ArrowLeft, CheckCircle2, CreditCard, Lock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart')
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    // Shipping
    fullName: '',
    email: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    // Payment
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const shipping = totalPrice >= 50000 ? 0 : 2990 // Free shipping above R$ 500
  const total = totalPrice + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setStep('success')
    clearCart()
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-muted-foreground mb-8">
            Adicione produtos para continuar com a compra
          </p>
          <Link href="/#colecao">
            <Button size="lg">
              Explorar Coleção
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  if (step === 'success') {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-muted-foreground mb-2">
            Obrigado pela sua compra! Você receberá um e-mail de confirmação em breve.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Número do pedido: #BB{Date.now().toString().slice(-8)}
          </p>
          <Link href="/">
            <Button size="lg">
              Voltar para a Loja
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Link>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
            Checkout
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {['cart', 'shipping', 'payment'].map((s, index) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => {
                  if (s === 'cart' || (s === 'shipping' && step !== 'cart') || (s === 'payment' && step === 'payment')) {
                    setStep(s as 'cart' | 'shipping' | 'payment')
                  }
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${step === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <span className="hidden sm:inline">
                  {s === 'cart' && 'Carrinho'}
                  {s === 'shipping' && 'Entrega'}
                  {s === 'payment' && 'Pagamento'}
                </span>
              </button>
              {index < 2 && (
                <div className="w-8 h-px bg-border mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cart Step */}
            {step === 'cart' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Seus Itens ({items.length})
                </h2>
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.selectedColor}`} className="py-6 first:pt-0">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.selectedColor}</p>
                          <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                          <p className="font-semibold text-foreground mt-2">
                            {formatPrice(item.product.priceInCents * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-full" onClick={() => setStep('shipping')}>
                  Continuar para Entrega
                </Button>
              </div>
            )}

            {/* Shipping Step */}
            {step === 'shipping' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Dados de Entrega
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep('cart')}>
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continuar para Pagamento
                  </Button>
                </div>
              </form>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-foreground" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Pagamento
                  </h2>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Pagamento seguro com criptografia SSL</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nome no cartão</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/AA"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep('shipping')}>
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isProcessing}>
                    {isProcessing ? 'Processando...' : `Pagar ${formatPrice(total)}`}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/50 rounded-xl p-6 sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 pb-6 border-b border-border">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatPrice(item.product.priceInCents * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">{formatPrice(total)}</span>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-600 mt-3">
                  Você ganhou frete grátis nesta compra!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
