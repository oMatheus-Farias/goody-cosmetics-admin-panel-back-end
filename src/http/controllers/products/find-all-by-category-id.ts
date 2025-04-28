import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { findAllProductsByCategoryIdSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeFindAllProductsByCategoryIdUseCase } from '../../../use-cases/_factories/products/make-find-all-products-by-category-id-use-case';
import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';

type TQuery = {
  categoryId?: string;
  ordenation: TOrdenation;
};

export async function findAllProductsByCategoryIdController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { categoryId } = request.query as TQuery;
    const { ordenation } = request.query as TQuery;

    await findAllProductsByCategoryIdSchema.parseAsync({
      categoryId,
      ordenation,
    });

    const findAllProductsByCategoryIdUseCase =
      makeFindAllProductsByCategoryIdUseCase();
    const products = await findAllProductsByCategoryIdUseCase.execute(
      categoryId,
      ordenation,
    );

    return reply.status(200).send(products);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
