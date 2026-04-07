import { z } from 'zod';

export const createCheckoutSchema = z.object({
  items: z
    .array(
      z.object({
        productSlug: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  customerEmail: z.email(),
  customerName: z.string().min(2).optional(),
  shipping: z.record(z.string(), z.unknown()).optional(),
});
