import type { Prisma } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError, NotFoundError } from '../../../errors';
import { updateCategoriesSchema } from '../../../libs/zod-schemas/categories-schemas';
import { makeUpdateCategoriesUseCase } from '../../../use-cases/_factories/categories/make-update-categories-use-case';

type TParams = {
  categoryId: string;
};

export async function updateCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { categoryId } = request.params as TParams;
    const data = request.body as Prisma.CategoryUpdateInput;

    await updateCategoriesSchema.parseAsync({
      categoryId,
      ...data,
    });

    const updateCategoriesUseCase = makeUpdateCategoriesUseCase();
    await updateCategoriesUseCase.execute(categoryId, data);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
