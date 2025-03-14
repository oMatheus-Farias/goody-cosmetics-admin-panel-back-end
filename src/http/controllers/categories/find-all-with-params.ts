import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { findAllCategoriesWithParamsSchema } from '../../../libs/zod-schemas/categories-schemas';
import { makeFindAllCategoriesWithParamsUseCase } from '../../../use-cases/_factories/categories/make-find-all-with-params-use-case';

type TQuery = {
  pageIndex?: string;
  searchTerm?: string;
};

export async function findAllCategoriesWithParamsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { pageIndex, searchTerm } = request.query as TQuery;
    const page = Number(pageIndex) || 0;

    await findAllCategoriesWithParamsSchema.parseAsync({
      page,
      searchTerm,
    });

    const findAllCategoriesWithParamsUseCase =
      makeFindAllCategoriesWithParamsUseCase();

    const categories = await findAllCategoriesWithParamsUseCase.execute(
      page,
      searchTerm,
    );

    return reply.status(200).send(categories);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
