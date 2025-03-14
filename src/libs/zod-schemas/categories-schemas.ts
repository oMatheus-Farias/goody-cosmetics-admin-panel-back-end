import { z } from 'zod';

export const categoriesSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required and must be a string',
    })
    .trim()
    .min(1, {
      message: 'Name must have at least 1 character',
    })
    .max(255, {
      message: 'Name must have at most 255 characters',
    }),
});

export const findAllCategoriesWithParamsSchema = z.object({
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

export const updateCategoriesSchema = z.object({
  categoryId: z
    .string({
      required_error: 'Category ID is required and must be a string',
    })
    .uuid({
      message: 'Category ID must be a valid UUID',
    }),
  name: z
    .string({
      required_error: 'Name is required and must be a string',
    })
    .trim()
    .min(1, {
      message: 'Name must have at least 1 character',
    })
    .max(25, {
      message: 'Name must have at most 25 characters',
    }),
});
