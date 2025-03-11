import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError, WrongPasswordLengthError } from '../../../errors';
import { randomPasswordGenerator } from '../../../functions/random-password-generator';
import { usersSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeCreateUsersUseCase } from '../../../use-cases/_factories/users/make-create-users-use-case';
import type { ICreateUsersDto } from '../../../use-cases/users/dtos/create-users-dto';

export async function createUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const data = request.body as Omit<ICreateUsersDto, 'passwordHash'>;

    await usersSchema.parseAsync(data);

    const createUsersUseCase = makeCreateUsersUseCase();
    const firstPassword = await randomPasswordGenerator();

    await createUsersUseCase.execute({
      ...data,
      password: firstPassword,
    });

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
