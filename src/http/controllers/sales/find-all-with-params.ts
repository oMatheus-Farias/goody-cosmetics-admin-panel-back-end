import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { findAllSalesWithParamsSchema } from '../../../libs/zod-schemas/sales-schemas';
import { makeFindAllSalesWithParamsUseCase } from '../../../use-cases/_factories/sales/make-find-all-sales-with-params-use-case';

type TQuery = {
  pageIndex?: string;
  searchTerm?: string;
};

export async function findAllSalesWithParamsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { pageIndex, searchTerm } = request.query as TQuery;
    const page = Number(pageIndex) || 0;

    await findAllSalesWithParamsSchema.parseAsync({
      page,
      searchTerm,
    });

    const findAllSalesWithParamsUseCase = makeFindAllSalesWithParamsUseCase();
    const sales = await findAllSalesWithParamsUseCase.execute(page, searchTerm);

    return reply.status(200).send(sales);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
