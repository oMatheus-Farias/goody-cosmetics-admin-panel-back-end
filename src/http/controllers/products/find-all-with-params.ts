import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { findAllProductsWithParamsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeFindAllProductsWithParamsUseCase } from '../../../use-cases/_factories/products/make-find-all-products-with-params-use-case';

type TQuery = {
  pageIndex?: string;
  searchTerm?: string;
};

export async function findAllProductsWithParamsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { pageIndex, searchTerm } = request.query as TQuery;
    const page = Number(pageIndex) || 0;

    await findAllProductsWithParamsSchema.parseAsync({
      page,
      searchTerm,
    });

    const findAllProductsWithParamsUseCase =
      makeFindAllProductsWithParamsUseCase();
    const products = await findAllProductsWithParamsUseCase.execute(
      page,
      searchTerm,
    );

    return reply.status(200).send(products);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
