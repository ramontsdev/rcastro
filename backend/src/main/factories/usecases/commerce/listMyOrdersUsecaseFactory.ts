import { ListMyOrdersUsecase } from '@/data/usecases/commerce/ListMyOrdersUsecase';

import { makeCommercePrismaRepository } from '../../repositories/commercePrismaRepositoryFactory';

export function makeListMyOrdersUsecase() {
  return new ListMyOrdersUsecase(makeCommercePrismaRepository());
}

