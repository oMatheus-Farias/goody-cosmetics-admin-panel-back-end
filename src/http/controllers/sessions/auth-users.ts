import type { FastifyReply, FastifyRequest } from 'fastify';

import { CredentialsError } from '../../../errors/credentials-error';
import { authUsersSchema } from '../../../libs/zod-schemas/auth-users-schemas';
import { makeAuthUsersUseCase } from '../../../use-cases/_factories/sessions/make-auth-users-use-case';
import type { AuthUsersDto } from '../../../use-cases/sessions/dtos/auth-users-dto';
import type { IReturnAuthUserEndpointData } from '../../../use-cases/sessions/interfaces/return-auth-user-endpoint-data';

export async function authUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<IReturnAuthUserEndpointData> {
  try {
    const data = request.body as AuthUsersDto;

    await authUsersSchema.parseAsync(data);

    const authUsersUseCase = makeAuthUsersUseCase();
    const user = await authUsersUseCase.execute(data);

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '1h',
        },
      },
    );

    return reply.status(200).send({
      token,
      refreshToken: user.refreshToken,
    });
  } catch (error) {
    if (error instanceof CredentialsError) {
      return reply.status(401).send({ error: error.message });
    }

    throw error;
  }
}
