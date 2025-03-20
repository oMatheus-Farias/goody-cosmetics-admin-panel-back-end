import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { findAllProductsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeFindAllProductsUseCase } from '../../../use-cases/_factories/products/make-find-all-products-use-case';
import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';

type TQuery = {
  ordenation: TOrdenation;
};

export async function findAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { ordenation } = request.query as TQuery;

    if (ordenation) {
      await findAllProductsSchema.parseAsync({ ordenation });
    }

    const findAllProductsUseCase = makeFindAllProductsUseCase();
    const products = await findAllProductsUseCase.execute(ordenation);

    return reply.status(200).send(products);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
