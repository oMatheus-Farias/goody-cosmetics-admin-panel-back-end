import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { deleteUsersSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeDeleteUsersUseCase } from '../../../use-cases/_factories/users/make-delete-users-use-case';

type TParams = {
  userId: string;
};

export async function deleteUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { userId } = request.params as TParams;

    await deleteUsersSchema.parseAsync({ userId });
    const deleteUsersUseCase = makeDeleteUsersUseCase();

    await deleteUsersUseCase.execute(userId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
