'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { apiFetchMyOrders, type MyOrder } from '@/lib/orders-api'
import { formatPrice } from '@/lib/products'

const statusLabel: Record<string, string> = {
  AWAITING_PAYMENT: 'Aguardando pagamento',
  PAID: 'Pago',
  CANCELLED: 'Cancelado',
  FULFILLED: 'Enviado',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: '2-digit' })
}

export function MyOrders() {
  const { isReady, isAuthenticated, token, user } = useAuth()
  const [orders, setOrders] = useState<MyOrder[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isReady) return
    if (!isAuthenticated || !token) return
    apiFetchMyOrders(token)
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : 'Falha ao carregar pedidos.'))
  }, [isReady, isAuthenticated, token])

  if (!isReady) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="h-7 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-6 space-y-3">
            <div className="h-20 animate-pulse rounded bg-muted" />
            <div className="h-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="mb-3 font-serif text-3xl font-semibold text-foreground">Meus pedidos</h1>
          <p className="mb-8 text-muted-foreground">Entre para ver o histórico de compras.</p>
          <Button asChild size="lg">
            <Link href="/entrar?redirect=/conta/pedidos">Entrar</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-foreground">Meus pedidos</h1>
        <p className="mb-8 text-muted-foreground">
          Olá, <span className="font-medium text-foreground">{user?.name}</span>. Aqui está o seu histórico.
        </p>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {orders && orders.length === 0 ? (
          <div className="rounded-xl border border-border bg-secondary/30 p-6 text-center">
            <p className="text-muted-foreground">Você ainda não fez nenhuma compra.</p>
            <Button asChild className="mt-4">
              <Link href="/#colecao">Explorar coleção</Link>
            </Button>
          </div>
        ) : null}

        {orders && orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="rounded-xl border border-border bg-background p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(o.createdAt)} · {statusLabel[o.status] ?? o.status}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{o.id}</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{formatPrice(o.totalCents)}</p>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <ul className="space-y-2 text-sm">
                    {o.items.map((i, idx) => (
                      <li key={`${o.id}-${idx}`} className="flex justify-between gap-4">
                        <span className="min-w-0 flex-1 truncate text-muted-foreground">
                          {i.productName} <span className="text-foreground">×{i.quantity}</span>
                        </span>
                        <span className="shrink-0 text-foreground">
                          {formatPrice(i.unitPriceCents * i.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

