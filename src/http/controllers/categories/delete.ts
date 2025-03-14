import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { deleteCategoriesSchema } from '../../../libs/zod-schemas/categories-schemas';
import { makeDeleteCategoriesUseCase } from '../../../use-cases/_factories/categories/make-delete-categories-use-case';

type TParams = {
  categoryId: string;
};

export async function deleteCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { categoryId } = request.params as TParams;

    await deleteCategoriesSchema.parseAsync({ categoryId });

    const deleteCategoriesUseCase = makeDeleteCategoriesUseCase();
    await deleteCategoriesUseCase.execute(categoryId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
