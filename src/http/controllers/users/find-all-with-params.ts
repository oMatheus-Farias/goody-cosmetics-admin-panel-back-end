import type { FastifyReply, FastifyRequest } from 'fastify';

import { env } from '../../../configs/env';
import { findAllUsersWithParamsSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeFindAllUsersWithParamsUseCase } from '../../../use-cases/_factories/users/make-find-all-users-with-params-use-case';

type TQuery = {
  pageIndex?: string;
  searchTerm?: string;
};

export async function findAllWithParamsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { pageIndex, searchTerm } = request.query as TQuery;
    const page = Number(pageIndex) || 0;

    await findAllUsersWithParamsSchema.parseAsync({ page, searchTerm });

    const findAllUsersWithParamsUseCase = makeFindAllUsersWithParamsUseCase();
    const users = await findAllUsersWithParamsUseCase.execute(page, searchTerm);

    return reply.status(200).send(users);
  } catch (error) {
    if (env.NODE_ENV === 'development') {
      console.error(error);
    }
    throw error;
  }
}
