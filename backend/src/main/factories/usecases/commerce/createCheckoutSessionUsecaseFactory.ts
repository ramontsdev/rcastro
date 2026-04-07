import { CreateCheckoutSessionUsecase } from '@/data/usecases/commerce/CreateCheckoutSessionUsecase';
import { env } from '@/main/config/env';
import { makeStripePaymentGateway } from '@/main/factories/adapters/stripePaymentGatewayFactory';
import { makeCommercePrismaRepository } from '@/main/factories/repositories/commercePrismaRepositoryFactory';

export function makeCreateCheckoutSessionUsecase() {
  if (env.payment.provider !== 'stripe') {
    throw new Error(`PAYMENT_PROVIDER não suportado: ${env.payment.provider}`);
  }

  if (!env.payment.checkoutSuccessUrl || !env.payment.checkoutCancelUrl) {
    throw new Error('CHECKOUT_SUCCESS_URL e CHECKOUT_CANCEL_URL são obrigatórios.');
  }

  return new CreateCheckoutSessionUsecase(
    makeCommercePrismaRepository(),
    makeStripePaymentGateway(),
    env.payment.checkoutSuccessUrl,
    env.payment.checkoutCancelUrl,
  );
}
