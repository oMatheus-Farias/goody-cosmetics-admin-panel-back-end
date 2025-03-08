import type { Prisma } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError, WrongPasswordLengthError } from '../../../errors';
import { usersSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeCreateUsersUseCase } from '../../../use-cases/_factories/users/make-create-users-use-case';

export async function createUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const data = request.body as Prisma.UserCreateInput;

    await usersSchema.parseAsync(data);

    const createUsersUseCase = makeCreateUsersUseCase();
    await createUsersUseCase.execute(data);

    return reply.status(201).send({ message: 'User created' });
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof WrongPasswordLengthError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
