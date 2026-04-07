export type CheckoutCartLine = {
  productSlug: string
  quantity: number
}

export type CreateCheckoutSessionInput = {
  items: CheckoutCartLine[]
  customerEmail: string
  customerName?: string
  shipping?: Record<string, unknown>
  userId?: string
}

export type CreateCheckoutSessionOutput = {
  checkoutUrl: string
  orderId: string
}

export interface ICreateCheckoutSession {
  execute(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionOutput>
}
