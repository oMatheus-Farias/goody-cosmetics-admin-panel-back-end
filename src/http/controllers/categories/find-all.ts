import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { makeFindAllCategoriesUseCase } from '../../../use-cases/_factories/categories/make-find-all-categories-use-case';

export async function findAllCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const findAllCategoriesUseCase = makeFindAllCategoriesUseCase();

    const categories = await findAllCategoriesUseCase.execute();

    return reply.status(200).send(categories);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
