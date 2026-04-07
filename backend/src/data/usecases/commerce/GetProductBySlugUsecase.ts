import type { ICommerceRepository } from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type { IGetProductBySlug } from '@/domain/usecases/commerce/GetProductBySlug';
import type { Product } from '@/main/db/prisma/generated/client';

export class GetProductBySlugUsecase implements IGetProductBySlug {
  constructor(private readonly commerce: ICommerceRepository) {}

  async getBySlug(slug: string): Promise<Product | null> {
    return this.commerce.findActiveProductBySlug(slug);
  }
}

