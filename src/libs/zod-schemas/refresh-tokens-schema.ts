import { z } from 'zod';

export const refreshTokensSchema = z.object({
  refreshTokenId: z
    .string({
      message: 'refreshTokenId is required',
    })
    .uuid({
      message: 'refreshTokenId must be a valid UUID',
    }),
});
