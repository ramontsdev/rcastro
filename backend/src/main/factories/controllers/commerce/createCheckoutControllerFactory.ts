import { CreateCheckoutController } from '@/presentation/controllers/commerce/CreateCheckoutController';

import { makeCreateCheckoutSessionUsecase } from '../../usecases/commerce/createCheckoutSessionUsecaseFactory';

export function makeCreateCheckoutController() {
  return new CreateCheckoutController(makeCreateCheckoutSessionUsecase());
}
