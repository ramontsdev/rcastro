import type { ICommerceRepository } from '@/data/protocols/repositories/commerce/ICommerceRepository';
import type { IListMyOrders, MyOrder } from '@/domain/usecases/commerce/ListMyOrders';

export class ListMyOrdersUsecase implements IListMyOrders {
  constructor(private readonly commerce: ICommerceRepository) {}

  async listByUserId(userId: string): Promise<MyOrder[]> {
    const orders = await this.commerce.listOrdersByUserId(userId);

    return orders.map(o => ({
      id: o.id,
      status: o.status,
      currency: o.currency,
      subtotalCents: o.subtotalCents,
      shippingCents: o.shippingCents,
      totalCents: o.totalCents,
      createdAt: o.createdAt,
      items: o.items.map(i => ({
        productName: i.productNameSnapshot,
        quantity: i.quantity,
        unitPriceCents: i.unitPriceCents,
      })),
    }));
  }
}

