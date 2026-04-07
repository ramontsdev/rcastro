import { GetProductBySlugController } from '@/presentation/controllers/commerce/GetProductBySlugController';

import { makeGetProductBySlugUsecase } from '../../usecases/commerce/getProductBySlugUsecaseFactory';

export function makeGetProductBySlugController() {
  return new GetProductBySlugController(makeGetProductBySlugUsecase());
}

