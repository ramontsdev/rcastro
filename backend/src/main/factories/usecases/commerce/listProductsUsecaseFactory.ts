import { ListProductsUsecase } from '@/data/usecases/commerce/ListProductsUsecase';

import { makeCommercePrismaRepository } from '../../repositories/commercePrismaRepositoryFactory';

export function makeListProductsUsecase() {
  return new ListProductsUsecase(makeCommercePrismaRepository());
}

