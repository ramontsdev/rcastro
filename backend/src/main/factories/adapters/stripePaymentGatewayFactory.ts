import Stripe from 'stripe';

import { StripePaymentGateway } from '@/infra/payment/StripePaymentGateway';
import { env } from '@/main/config/env';

export function makeStripePaymentGateway() {
  const secretKey = env.payment.stripeSecretKey;
  const webhookSecret = env.payment.stripeWebhookSecret;

  if (!secretKey || !webhookSecret) {
    throw new Error('STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET são obrigatórios para pagamentos.');
  }

  const stripe = new Stripe(secretKey, {
    typescript: true,
  });

  return new StripePaymentGateway(stripe, webhookSecret);
}
