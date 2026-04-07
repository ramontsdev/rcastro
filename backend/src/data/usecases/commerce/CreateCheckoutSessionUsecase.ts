import type { IPaymentGateway } from '@/data/protocols/payment/PaymentGateway';
import type { ICommerceRepository } from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type {
  CreateCheckoutSessionInput,
  CreateCheckoutSessionOutput,
  ICreateCheckoutSession,
} from '@/domain/usecases/commerce/CreateCheckoutSession';
import type { Prisma } from '@/main/db/prisma/generated/client';

import { prepareCheckoutCart } from './prepareCheckoutCart';

export class CreateCheckoutSessionUsecase implements ICreateCheckoutSession {
  constructor(
    private readonly commerce: ICommerceRepository,
    private readonly paymentGateway: IPaymentGateway,
    private readonly checkoutSuccessUrl: string,
    private readonly checkoutCancelUrl: string,
  ) {}

  async execute(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionOutput> {
    const slugs = [...new Set(input.items.map(i => i.productSlug))];
    const products = await this.commerce.findActiveProductsBySlugs(slugs);
    const cart = prepareCheckoutCart(input.items, products);

    const order = await this.commerce.createAwaitingOrder({
      customerEmail: input.customerEmail,
      customerName: input.customerName,
      userId: input.userId,
      shippingJson: (input.shipping ?? {}) as Prisma.InputJsonValue,
      subtotalCents: cart.subtotalCents,
      shippingCents: cart.shippingCents,
      totalCents: cart.totalCents,
      items: cart.orderItems,
    });

    const payment = await this.commerce.createPendingPayment(
      order.id,
      this.paymentGateway.providerId,
      cart.totalCents,
      'brl',
    );

    const session = await this.paymentGateway.createPayment({
      orderId: order.id,
      amountCents: cart.totalCents,
      currency: 'brl',
      customerEmail: input.customerEmail,
      successUrl: this.checkoutSuccessUrl,
      cancelUrl: this.checkoutCancelUrl,
      metadata: {
        orderId: order.id,
        paymentId: payment.id,
      },
      lineItems: cart.lineItems,
    });

    await this.commerce.attachCheckoutSession(payment.id, session.providerPaymentId);

    if (!session.redirectUrl) {
      throw new Error('Gateway não retornou URL de checkout.');
    }

    return {
      checkoutUrl: session.redirectUrl,
      orderId: order.id,
    };
  }
}
