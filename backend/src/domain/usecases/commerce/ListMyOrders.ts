export type MyOrderItem = {
  productName: string
  quantity: number
  unitPriceCents: number
}

export type MyOrder = {
  id: string
  status: string
  currency: string
  subtotalCents: number
  shippingCents: number
  totalCents: number
  createdAt: Date
  items: MyOrderItem[]
}

export interface IListMyOrders {
  listByUserId(userId: string): Promise<MyOrder[]>
}

