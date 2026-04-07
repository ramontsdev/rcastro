import { PaymentWebhookController } from '@/presentation/controllers/commerce/PaymentWebhookController';

import { makeProcessPaymentWebhookUsecase } from '../../usecases/commerce/processPaymentWebhookUsecaseFactory';

export function makePaymentWebhookController() {
  return new PaymentWebhookController(makeProcessPaymentWebhookUsecase());
}
