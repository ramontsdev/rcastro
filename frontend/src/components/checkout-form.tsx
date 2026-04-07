'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { useCart } from '@/contexts/cart-context'
import { createCheckoutSession } from '@/lib/create-checkout-session'
import { formatPrice } from '@/lib/products'
import { ArrowLeft, CreditCard, Lock, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FREE_SHIPPING_SUBTOTAL_CENTS = 50000
const DEFAULT_SHIPPING_CENTS = 2990

function aggregateItemsForCheckout(
  items: { product: { id: string }; quantity: number }[]
): { productSlug: string; quantity: number }[] {
  const map = new Map<string, number>()
  for (const item of items) {
    const slug = item.product.id
    map.set(slug, (map.get(slug) ?? 0) + item.quantity)
  }
  return [...map.entries()].map(([productSlug, quantity]) => ({ productSlug, quantity }))
}

export function CheckoutForm() {
  const { items, totalPrice } = useCart()
  const { user, isReady, isAuthenticated, token } = useAuth()
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment'>('cart')
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
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
  })

  useEffect(() => {
    if (!isReady || !user) return
    setFormData((prev) => ({
      ...prev,
      email: user.email,
      fullName: prev.fullName.trim() ? prev.fullName : user.name,
    }))
  }, [isReady, user])

  const shipping = totalPrice >= FREE_SHIPPING_SUBTOTAL_CENTS ? 0 : DEFAULT_SHIPPING_CENTS
  const total = totalPrice + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStartStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutError(null)
    setIsProcessing(true)

    try {
      const payloadItems = aggregateItemsForCheckout(items)
      const { checkoutUrl } = await createCheckoutSession(
        {
          items: payloadItems,
          customerEmail: formData.email.trim(),
          customerName: formData.fullName.trim() || undefined,
          shipping: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        },
        isAuthenticated ? token : null
      )
      window.location.assign(checkoutUrl)
    } catch (err) {
      setIsProcessing(false)
      setCheckoutError(err instanceof Error ? err.message : 'Erro ao abrir o pagamento.')
    }
  }

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-muted-foreground/50" />
          <h1 className="mb-4 font-serif text-3xl font-semibold text-foreground">
            Seu carrinho está vazio
          </h1>
          <p className="mb-8 text-muted-foreground">Adicione produtos para continuar com a compra</p>
          <Link href="/#colecao">
            <Button size="lg">Explorar Coleção</Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-foreground lg:text-4xl">Checkout</h1>
        </div>

        {isReady && isAuthenticated && user ? (
          <div className="mb-6 rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground">
            Comprando como <strong className="font-medium">{user.name}</strong>
            <span className="text-muted-foreground"> ({user.email})</span>
            . Os dados de contato abaixo vêm da sua conta; o endereço pode ser preenchido agora.
          </div>
        ) : isReady && !isAuthenticated ? (
          <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">
              Já tem conta? Entre para preencher nome e e-mail automaticamente.
            </span>
            <Button variant="outline" size="sm" className="shrink-0" asChild>
              <Link href="/entrar?redirect=/checkout">Entrar</Link>
            </Button>
          </div>
        ) : null}

        <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2">
          {(['cart', 'shipping', 'payment'] as const).map((s, index) => (
            <div key={s} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (
                    s === 'cart' ||
                    (s === 'shipping' && step !== 'cart') ||
                    (s === 'payment' && step === 'payment')
                  ) {
                    setStep(s)
                  }
                }}
                className={`
                  flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors
                  ${
                    step === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs">
                  {index + 1}
                </span>
                <span className="hidden sm:inline">
                  {s === 'cart' && 'Carrinho'}
                  {s === 'shipping' && 'Entrega'}
                  {s === 'payment' && 'Pagamento'}
                </span>
              </button>
              {index < 2 && <div className="mx-2 h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 'cart' && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Seus Itens ({items.length})
                </h2>
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 first:pt-0">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={item.product.images[0] || '/placeholder.svg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.selectedColor}</p>
                          <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                          <p className="mt-2 font-semibold text-foreground">
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

            {step === 'shipping' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep('payment')
                }}
                className="space-y-6"
              >
                <h2 className="font-serif text-xl font-semibold text-foreground">Dados de Entrega</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      readOnly={isAuthenticated}
                      className={isAuthenticated ? 'bg-muted/50' : undefined}
                      required
                    />
                    {isAuthenticated ? (
                      <p className="mt-1 text-xs text-muted-foreground">E-mail da conta (somente leitura)</p>
                    ) : null}
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

            {step === 'payment' && (
              <form onSubmit={handleStartStripeCheckout} className="space-y-6">
                <div className="mb-6 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-foreground" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Pagamento seguro
                  </h2>
                </div>

                <div className="mb-6 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 shrink-0" />
                    <span>
                      Você será redirecionado para o checkout hospedado pela Stripe. Não solicitamos
                      dados de cartão neste site.
                    </span>
                  </div>
                </div>

                {checkoutError ? (
                  <p className="text-sm text-destructive" role="alert">
                    {checkoutError}
                  </p>
                ) : null}

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep('shipping')}>
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isProcessing}>
                    {isProcessing ? 'Abrindo pagamento…' : `Pagar ${formatPrice(total)} na Stripe`}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-secondary/50 p-6">
              <h3 className="mb-6 font-serif text-lg font-semibold text-foreground">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 border-b border-border pb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(item.product.priceInCents * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-b border-border py-6">
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
                <p className="text-xs text-muted-foreground">
                  O valor final (incluindo frete) é calculado no servidor e pode diferir ligeiramente
                  se as regras de frete forem atualizadas.
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <span className="text-base font-semibold text-foreground">Total estimado</span>
                <span className="text-xl font-semibold text-foreground">{formatPrice(total)}</span>
              </div>

              {shipping === 0 && (
                <p className="mt-3 text-xs text-green-600">Você ganhou frete grátis nesta compra!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
