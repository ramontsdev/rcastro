import { getApiBaseUrl } from '@/lib/api-base'

export type MyOrderItem = {
  productName: string
  quantity: number
  unitPriceCents: number
}

export type MyOrder = {
  id: string
  status: string
  currency: string
  subtotalCents: number
  shippingCents: number
  totalCents: number
  createdAt: string
  items: MyOrderItem[]
}

function messageFromBody(body: unknown): string {
  if (body && typeof body === 'object' && 'error' in body && typeof (body as { error: string }).error === 'string') {
    return (body as { error: string }).error
  }
  return 'Não foi possível carregar seus pedidos.'
}

export async function apiFetchMyOrders(accessToken: string): Promise<MyOrder[]> {
  const res = await fetch(`${getApiBaseUrl()}/api/orders/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }

  if (!Array.isArray(data)) {
    throw new Error('Resposta inválida do servidor.')
  }

  return data as MyOrder[]
}

