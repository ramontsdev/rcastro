import type Stripe from 'stripe';

import type { NormalizedPaymentEvent } from '@/data/protocols/payment/PaymentGateway';

export function mapStripeEventToNormalized(
  event: Stripe.Event,
  providerId: string,
): NormalizedPaymentEvent[] {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId ?? '';
      const paymentId = session.metadata?.paymentId ?? '';
      const amount = session.amount_total ?? 0;
      const currency = (session.currency ?? 'brl').toLowerCase();

      if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
        return [];
      }

      return [
        {
          type: 'payment.succeeded',
          provider: providerId,
          providerPaymentId: session.id,
          amountCents: amount,
          currency,
          metadata: { orderId, paymentId },
          rawProviderEventId: event.id,
        },
      ];
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;

      return [
        {
          type: 'payment.failed',
          provider: providerId,
          providerPaymentId: session.id,
          amountCents: session.amount_total ?? 0,
          currency: (session.currency ?? 'brl').toLowerCase(),
          metadata: {
            orderId: session.metadata?.orderId ?? '',
            paymentId: session.metadata?.paymentId ?? '',
          },
          rawProviderEventId: event.id,
        },
      ];
    }

    default:
      return [];
  }
}
