import type { Prisma } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError } from '../../../errors';
import { categoriesSchema } from '../../../libs/zod-schemas/categories-schemas';
import { makeCreateCategoriesUseCase } from '../../../use-cases/_factories/categories/make-create-categories-use-case';

export async function createCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, emoji } = request.body as Prisma.CategoryCreateInput;

    await categoriesSchema.parseAsync({ name, emoji });

    const createCategoriesUseCase = makeCreateCategoriesUseCase();
    await createCategoriesUseCase.execute({ name, emoji });

    reply.status(201).send({ message: 'Category created' });
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
