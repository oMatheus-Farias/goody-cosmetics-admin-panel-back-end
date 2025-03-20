import { z } from 'zod';

export const findAllProductsSchema = z.object({
  ordenation: z.enum(['LOWER_PRICE', 'HIGHER_PRICE'], {
    message: 'Ordernation is required and must be LOWER_PRICE or HIGHER_PRICE',
  }),
});

export const createProductsSchema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .trim()
    .min(2, {
      message: 'Name must be at least 2 characters long',
    })
    .max(255, {
      message: 'Name must be at most 255 characters long',
    }),
  description: z
    .string({
      message: 'Description is required',
    })
    .trim()
    .min(2, {
      message: 'Description must be at least 2 characters long',
    }),
  categoryId: z
    .string({
      message: 'Category is required',
    })
    .uuid({}),
  oldPrice: z.coerce
    .number({
      message: 'Old price is required',
    })
    .positive({
      message: 'Old price must be a positive number',
    }),
  currentPrice: z.coerce
    .number({
      message: 'Current price is required',
    })
    .positive({
      message: 'Current price must be a positive number',
    }),
  stockQuantity: z.coerce.number({
    message: 'Stock quantity is required',
  }),
  image01: z.object({
    name: z.string().nonempty(),
    type: z.string().nonempty(),
    size: z.number().positive(),
  }),
  image02: z.object({
    name: z.string().nonempty(),
    type: z.string().nonempty(),
    size: z.number().positive(),
  }),
});
