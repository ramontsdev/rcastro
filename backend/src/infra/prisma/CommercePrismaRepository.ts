/* eslint-disable max-lines -- repositório de pedidos/pagamentos */
import type {
  CreateAwaitingOrderDTO,
  ICommerceRepository,
} from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type { OrderPaidEmailPayload } from '@/domain/usecases/commerce/OrderConfirmationMail';
import type { Order, OrderItem, Payment, Product, PrismaClient } from '@/main/db/prisma/generated/client';
import { OrderStatus, PaymentStatus } from '@/main/db/prisma/generated/enums';

export class CommercePrismaRepository implements ICommerceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findActiveProductsBySlugs(slugs: string[]): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { slug: { in: slugs }, active: true },
    });
  }

  async listActiveProducts(filters?: { line?: string; category?: string }): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        active: true,
        ...(filters?.line ? { line: filters.line } : {}),
        ...(filters?.category ? { category: filters.category } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActiveProductBySlug(slug: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { slug, active: true },
    });
  }

  async listOrdersByUserId(userId: string): Promise<(Order & { items: OrderItem[] })[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAwaitingOrder(data: CreateAwaitingOrderDTO): Promise<Order & { items: OrderItem[] }> {
    return this.prisma.order.create({
      data: {
        status: OrderStatus.AWAITING_PAYMENT,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        userId: data.userId,
        shippingJson: data.shippingJson,
        subtotalCents: data.subtotalCents,
        shippingCents: data.shippingCents,
        totalCents: data.totalCents,
        items: {
          create: data.items.map(i => ({
            productId: i.productId,
            productNameSnapshot: i.productNameSnapshot,
            unitPriceCents: i.unitPriceCents,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });
  }

  async createPendingPayment(
    orderId: string,
    provider: string,
    amountCents: number,
    currency: string,
  ): Promise<Payment> {
    return this.prisma.payment.create({
      data: {
        orderId,
        provider,
        status: PaymentStatus.PENDING,
        amountCents,
        currency: currency.toLowerCase(),
      },
    });
  }

  async attachCheckoutSession(paymentId: string, sessionId: string): Promise<void> {
    await this.prisma.payment.update({
      where: { id: paymentId },
      data: { providerCheckoutSessionId: sessionId },
    });
  }

  async tryConsumeWebhookEvent(eventId: string, provider: string): Promise<boolean> {
    try {
      await this.prisma.processedWebhookEvent.create({
        data: { id: eventId, provider },
      });

      return true;
    } catch {
      return false;
    }
  }

  async applyCheckoutSessionPaid(sessionId: string): Promise<OrderPaidEmailPayload | null> {
    return this.prisma.$transaction(async tx => {
      const payment = await tx.payment.findUnique({
        where: { providerCheckoutSessionId: sessionId },
        include: { order: { include: { items: true } } },
      });

      if (!payment || payment.status === PaymentStatus.SUCCEEDED) {
        return null;
      }

      const { order } = payment;

      await tx.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.SUCCEEDED },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: OrderStatus.PAID },
      });

      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return {
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        subtotalCents: order.subtotalCents,
        shippingCents: order.shippingCents,
        totalCents: order.totalCents,
        currency: order.currency,
        items: order.items.map(i => ({
          productName: i.productNameSnapshot,
          quantity: i.quantity,
          unitPriceCents: i.unitPriceCents,
        })),
      };
    });
  }

  async applyCheckoutSessionFailed(sessionId: string): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const payment = await tx.payment.findUnique({
        where: { providerCheckoutSessionId: sessionId },
      });

      if (!payment || payment.status !== PaymentStatus.PENDING) {
        return;
      }

      await tx.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: OrderStatus.CANCELLED },
      });
    });
  }
}
