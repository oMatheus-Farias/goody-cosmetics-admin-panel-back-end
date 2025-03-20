import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { makeFindAllProductsUseCase } from '../../../use-cases/_factories/products/make-find-all-products-use-case';

export async function findAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const findAllProductsUseCase = makeFindAllProductsUseCase();
    const products = await findAllProductsUseCase.execute();

    return reply.status(200).send(products);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
