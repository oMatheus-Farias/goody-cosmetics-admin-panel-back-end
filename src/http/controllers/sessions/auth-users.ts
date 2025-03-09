import type { FastifyReply, FastifyRequest } from 'fastify';

import { CredentialsError } from '../../../errors/credentials-error';
import { authUsersSchema } from '../../../libs/zod-schemas/auth-users-schemas';
import { makeAuthUsersUseCase } from '../../../use-cases/_factories/sessions/make-auth-users-use-case';
import type { AuthUsersDto } from '../../../use-cases/sessions/dtos/auth-users-dto';

export async function authUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = request.body as AuthUsersDto;

    await authUsersSchema.parseAsync(data);

    const authUsersUseCase = makeAuthUsersUseCase();
    const userData = await authUsersUseCase.execute(data);

    //TODO: Implementar o JWT token e adicionar tipagem no retorno

    return reply.status(200).send(userData);
  } catch (error) {
    if (error instanceof CredentialsError) {
      return reply.status(401).send({ error: error.message });
    }

    throw error;
  }
}
