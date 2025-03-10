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
