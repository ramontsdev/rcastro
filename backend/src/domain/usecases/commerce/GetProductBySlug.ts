import type { Product } from '@/main/db/prisma/generated/client';

export interface IGetProductBySlug {
  getBySlug(slug: string): Promise<Product | null>
}

