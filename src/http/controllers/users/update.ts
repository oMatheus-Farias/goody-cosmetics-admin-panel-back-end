import type { Prisma } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError, NotFoundError } from '../../../errors';
import { updateUsersSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeUpdateUsersUseCase } from '../../../use-cases/_factories/users/make-update-users-use-case';

type TParams = {
  userId: string;
};

export async function updateUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { userId } = request.params as TParams;
    const data = request.body as Prisma.UserUpdateInput;

    await updateUsersSchema.parseAsync({
      userId,
      ...data,
    });

    const updateUsersUseCase = makeUpdateUsersUseCase();
    await updateUsersUseCase.execute(userId, data);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
