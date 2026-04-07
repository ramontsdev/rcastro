import { TextDecoder } from 'node:util';

import Stripe from 'stripe';

import type {
  CreatePaymentInput,
  CreatePaymentOutput,
  IPaymentGateway,
  ParseWebhookInput,
} from '@/data/protocols/payment/PaymentGateway';

import { mapStripeEventToNormalized } from './stripeWebhookMapper';

export class StripePaymentGateway implements IPaymentGateway {
  readonly providerId = 'stripe';

  constructor(
    private readonly stripe: Stripe,
    private readonly webhookSecret: string,
  ) {}

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentOutput> {
    const currency = input.currency.toLowerCase();
    const stripeLineItems = input.lineItems.map(li => ({
      price_data: {
        currency,
        unit_amount: li.unitAmountCents,
        product_data: {
          name: li.name,
        },
      },
      quantity: li.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: stripeLineItems,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      customer_email: input.customerEmail,
      metadata: input.metadata,
      payment_intent_data: {
        metadata: input.metadata,
      },
    });

    return {
      provider: this.providerId,
      providerPaymentId: session.id,
      redirectUrl: session.url ?? undefined,
    };
  }

  async parseWebhook(input: ParseWebhookInput) {
    const signature = getHeader(input.headers, 'stripe-signature');

    if (!signature) {
      throw new Error('Missing stripe-signature header');
    }

    const raw =
      typeof input.rawBody === 'string'
        ? input.rawBody
        : new TextDecoder('utf8').decode(input.rawBody);

    const event = this.stripe.webhooks.constructEvent(raw, signature, this.webhookSecret);

    return mapStripeEventToNormalized(event, this.providerId);
  }
}

function getHeader(headers: Record<string, string>, name: string): string | undefined {
  return headers[name.toLowerCase()];
}
