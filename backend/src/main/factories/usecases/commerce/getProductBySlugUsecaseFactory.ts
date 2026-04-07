import { GetProductBySlugUsecase } from '@/data/usecases/commerce/GetProductBySlugUsecase';

import { makeCommercePrismaRepository } from '../../repositories/commercePrismaRepositoryFactory';

export function makeGetProductBySlugUsecase() {
  return new GetProductBySlugUsecase(makeCommercePrismaRepository());
}

