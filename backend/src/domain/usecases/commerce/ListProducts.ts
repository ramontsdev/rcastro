import type { Product } from '@/main/db/prisma/generated/client';

export type ListProductsFilters = {
  line?: string
  category?: string
}

export interface IListProducts {
  list(filters?: ListProductsFilters): Promise<Product[]>
}

