import { ProcessPaymentWebhookUsecase } from '@/data/usecases/commerce/ProcessPaymentWebhookUsecase';
import { env } from '@/main/config/env';
import { makeStripePaymentGateway } from '@/main/factories/adapters/stripePaymentGatewayFactory';
import { makeOrderConfirmationMailer } from '@/main/factories/mail/orderConfirmationMailerFactory';
import { makeCommercePrismaRepository } from '@/main/factories/repositories/commercePrismaRepositoryFactory';

export function makeProcessPaymentWebhookUsecase() {
  if (env.payment.provider !== 'stripe') {
    throw new Error(`PAYMENT_PROVIDER não suportado: ${env.payment.provider}`);
  }

  return new ProcessPaymentWebhookUsecase(
    makeCommercePrismaRepository(),
    makeStripePaymentGateway(),
    makeOrderConfirmationMailer(),
  );
}
