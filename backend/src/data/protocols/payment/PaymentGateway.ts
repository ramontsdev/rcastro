/**
 * Porta agnóstica de gateway de pagamento.
 * Implementações concretas (ex.: Stripe) ficam em infra/ e não devem vazar para domínio/use cases.
 */

/** Nome do provedor — extensível sem alterar contratos dos use cases. */
export type PaymentProviderId = 'stripe' | string

/** Eventos normalizados após webhook (ou polling, se algum provedor exigir). */
export type NormalizedPaymentEventType =
  | 'payment.pending'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'payment.refunded'
  | 'payment.dispute_opened'

export type NormalizedPaymentEvent = {
  type: NormalizedPaymentEventType
  provider: PaymentProviderId
  /** ID estável do pagamento no provedor (charge, intent, session, etc.). */
  providerPaymentId: string
  amountCents: number
  currency: string
  /** Deve incluir pelo menos o id interno do pedido para correlação. */
  metadata: Record<string, string>
  rawProviderEventId?: string
}

/** Itens exibidos no Checkout do provedor (preços já validados no pedido). */
export type CheckoutLineItem = {
  name: string
  unitAmountCents: number
  quantity: number
}

export type CreatePaymentInput = {
  orderId: string
  amountCents: number
  currency: string
  customerEmail?: string
  successUrl: string
  cancelUrl: string
  metadata: Record<string, string>
  lineItems: CheckoutLineItem[]
}

/**
 * Resultado para o cliente iniciar o pagamento (Checkout hospedado ou Elements).
 */
export type CreatePaymentOutput = {
  provider: PaymentProviderId
  providerPaymentId: string
  /** URL de redirecionamento (Checkout hospedado). */
  redirectUrl?: string
  /** Segredo para confirmar no cliente (ex.: Payment Element). */
  clientSecret?: string
}

export type ParseWebhookInput = {
  /** Corpo bruto do webhook (string ou bytes, conforme o framework). */
  rawBody: string | Uint8Array
  /** Cabeçalhos normalizados em minúsculas (ex.: `stripe-signature`). */
  headers: Record<string, string>
}

export interface IPaymentGateway {
  readonly providerId: PaymentProviderId

  createPayment(input: CreatePaymentInput): Promise<CreatePaymentOutput>

  /**
   * Valida assinatura/autenticidade e traduz para eventos do nosso domínio.
   * Pode retornar vários eventos se o provedor empacotar múltiplas transições.
   */
  parseWebhook(input: ParseWebhookInput): Promise<NormalizedPaymentEvent[]>
}
