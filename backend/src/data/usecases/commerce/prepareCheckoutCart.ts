import type { CheckoutCartLine } from '@/domain/usecases/commerce/CreateCheckoutSession';
import type { Product } from '@/main/db/prisma/generated/client';

const FREE_SHIPPING_SUBTOTAL_CENTS = 50000;
const DEFAULT_SHIPPING_CENTS = 2990;

export type PreparedCheckoutCart = {
  subtotalCents: number
  shippingCents: number
  totalCents: number
  lineItems: { name: string; unitAmountCents: number; quantity: number }[]
  orderItems: {
    productId: string
    productNameSnapshot: string
    unitPriceCents: number
    quantity: number
  }[]
}

export function prepareCheckoutCart(
  inputItems: CheckoutCartLine[],
  products: Product[],
): PreparedCheckoutCart {
  const slugs = [...new Set(inputItems.map(i => i.productSlug))];

  if (products.length !== slugs.length) {
    throw new Error('Um ou mais produtos não foram encontrados ou estão inativos.');
  }

  const bySlug = new Map(products.map(p => [p.slug, p]));

  let subtotalCents = 0;
  const lineItems: PreparedCheckoutCart['lineItems'] = [];
  const orderItems: PreparedCheckoutCart['orderItems'] = [];

  for (const line of inputItems) {
    const product = bySlug.get(line.productSlug);

    if (!product) {
      throw new Error('Produto inválido.');
    }

    if (product.stock < line.quantity) {
      throw new Error(`Estoque insuficiente para ${product.name}.`);
    }

    subtotalCents += product.priceCents * line.quantity;
    lineItems.push({
      name: product.name,
      unitAmountCents: product.priceCents,
      quantity: line.quantity,
    });
    orderItems.push({
      productId: product.id,
      productNameSnapshot: product.name,
      unitPriceCents: product.priceCents,
      quantity: line.quantity,
    });
  }

  const shippingCents = subtotalCents >= FREE_SHIPPING_SUBTOTAL_CENTS ? 0 : DEFAULT_SHIPPING_CENTS;
  const totalCents = subtotalCents + shippingCents;

  if (shippingCents > 0) {
    lineItems.push({
      name: 'Frete',
      unitAmountCents: shippingCents,
      quantity: 1,
    });
  }

  return {
    subtotalCents,
    shippingCents,
    totalCents,
    lineItems,
    orderItems,
  };
}
