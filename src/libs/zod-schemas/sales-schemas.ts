import { z } from 'zod';

export const createSalesSchema = z.object({
  saleDate: z
    .string({
      required_error: 'Sale date is required',
    })
    .datetime({
      message: 'Invalid date format',
    }),
  items: z.array(
    z.object({
      productId: z
        .string({
          required_error: 'Product ID is required',
        })
        .uuid({
          message: 'Invalid product ID',
        }),
      quantity: z
        .number({
          required_error: 'Quantity is required',
        })
        .int({
          message: 'Quantity must be an integer',
        }),
      unitPrice: z
        .number({
          required_error: 'Unit price is required',
        })
        .positive({
          message: 'Unit price must be a positive number',
        }),
    }),
  ),
});
