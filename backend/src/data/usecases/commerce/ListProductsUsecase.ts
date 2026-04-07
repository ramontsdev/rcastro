import type { ICommerceRepository } from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type { IListProducts, ListProductsFilters } from '@/domain/usecases/commerce/ListProducts';
import type { Product } from '@/main/db/prisma/generated/client';

export class ListProductsUsecase implements IListProducts {
  constructor(private readonly commerce: ICommerceRepository) {}

  async list(filters?: ListProductsFilters): Promise<Product[]> {
    return this.commerce.listActiveProducts(filters);
  }
}

