export type OrderPaidEmailPayload = {
  customerEmail: string
  customerName: string | null
  orderId: string
  subtotalCents: number
  shippingCents: number
  totalCents: number
  currency: string
  items: { productName: string; quantity: number; unitPriceCents: number }[]
}

export interface IOrderConfirmationMailer {
  sendPaidOrderConfirmation(payload: OrderPaidEmailPayload): Promise<void>
}
