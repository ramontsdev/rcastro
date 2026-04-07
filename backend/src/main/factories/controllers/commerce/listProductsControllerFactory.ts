import { ListProductsController } from '@/presentation/controllers/commerce/ListProductsController';

import { makeListProductsUsecase } from '../../usecases/commerce/listProductsUsecaseFactory';

export function makeListProductsController() {
  return new ListProductsController(makeListProductsUsecase());
}

