import { ListMyOrdersController } from '@/presentation/controllers/commerce/ListMyOrdersController';

import { makeListMyOrdersUsecase } from '../../usecases/commerce/listMyOrdersUsecaseFactory';

export function makeListMyOrdersController() {
  return new ListMyOrdersController(makeListMyOrdersUsecase());
}

