import type { OrderPaidEmailPayload } from '@/domain/usecases/commerce/OrderConfirmationMail';
import type { Prisma } from '@/main/db/prisma/generated/client';
import type { Order, OrderItem, Payment, Product } from '@/main/db/prisma/generated/client';

export type CreateOrderItemDTO = {
  productId: string
  productNameSnapshot: string
  unitPriceCents: number
  quantity: number
}

export type CreateAwaitingOrderDTO = {
  customerEmail: string
  customerName?: string
  userId?: string
  shippingJson: Prisma.InputJsonValue
  subtotalCents: number
  shippingCents: number
  totalCents: number
  items: CreateOrderItemDTO[]
}

export interface ICommerceRepository {
  findActiveProductsBySlugs(slugs: string[]): Promise<Product[]>

  listActiveProducts(filters?: {
    line?: string
    category?: string
  }): Promise<Product[]>

  findActiveProductBySlug(slug: string): Promise<Product | null>

  listOrdersByUserId(userId: string): Promise<(Order & { items: OrderItem[] })[]>

  createAwaitingOrder(data: CreateAwaitingOrderDTO): Promise<Order & { items: OrderItem[] }>

  createPendingPayment(
    orderId: string,
    provider: string,
    amountCents: number,
    currency: string,
  ): Promise<Payment>

  attachCheckoutSession(paymentId: string, sessionId: string): Promise<void>

  /** Retorna `false` se o evento já foi processado (idempotência). */
  tryConsumeWebhookEvent(eventId: string, provider: string): Promise<boolean>

  /** Quando o pagamento passa de pendente a confirmado, devolve dados para e-mail; caso contrário `null`. */
  applyCheckoutSessionPaid(sessionId: string): Promise<OrderPaidEmailPayload | null>

  applyCheckoutSessionFailed(sessionId: string): Promise<void>
}
