import { z } from 'zod';

export const findAllProductsByIdSchema = z.object({
  productId: z
    .string({
      required_error: 'Product id is required and must be a string',
    })
    .uuid({
      message: 'Product id must be a valid UUID',
    }),
});

export const findAllProductsSchema = z.object({
  ordenation: z.enum(['A-Z', 'Z-A', 'LOWER_PRICE', 'HIGHER_PRICE'], {
    message:
      'Ordernation is required and must be A-Z or Z-A or LOWER_PRICE or HIGHER_PRICE',
  }),
});

export const findAllProductsByCategoryIdSchema = z.object({
  categoryId: z
    .string({
      required_error: 'Category id is required and must be a string',
    })
    .uuid({
      message: 'Category id must be a valid UUID',
    }),
  ordenation: z.enum(['A-Z', 'Z-A', 'LOWER_PRICE', 'HIGHER_PRICE'], {
    message:
      'Ordernation is required and must be A-Z or Z-A or LOWER_PRICE or HIGHER_PRICE',
  }),
});

export const findAllProductsWithParamsSchema = z.object({
  page: z.coerce
    .number({
      required_error: 'Page index is required and must be a number',
    })
    .int({
      message: 'Page index must be an integer',
    })
    .optional(),
  searchTerm: z
    .string({
      required_error: 'Search term is required and must be a string',
    })
    .optional(),
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
