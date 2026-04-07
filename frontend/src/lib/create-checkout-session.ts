import { getApiBaseUrl } from '@/lib/api-base'

export type CheckoutLineItem = {
  productSlug: string
  quantity: number
}

export type CreateCheckoutSessionPayload = {
  items: CheckoutLineItem[]
  customerEmail: string
  customerName?: string
  shipping?: Record<string, unknown>
}

export type CreateCheckoutSessionResult = {
  checkoutUrl: string
  orderId: string
}

type ApiErrorBody =
  | { error: string }
  | Array<{ field: string; message: string }>

function messageFromErrorBody(body: ApiErrorBody): string {
  if (Array.isArray(body)) {
    return body.map((i) => i.message).join(' ') || 'Dados inválidos.'
  }
  return body.error ?? 'Não foi possível iniciar o pagamento.'
}

export async function createCheckoutSession(
  payload: CreateCheckoutSessionPayload,
  accessToken?: string | null
): Promise<CreateCheckoutSessionResult> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(`${getApiBaseUrl()}/api/checkout/session`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  const data = (await res.json()) as CreateCheckoutSessionResult | ApiErrorBody

  if (!res.ok) {
    throw new Error(messageFromErrorBody(data as ApiErrorBody))
  }

  const ok = data as CreateCheckoutSessionResult
  if (!ok.checkoutUrl) {
    throw new Error('Resposta inválida do servidor.')
  }

  return ok
}
