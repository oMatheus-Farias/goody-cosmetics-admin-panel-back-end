import type { FastifyReply, FastifyRequest } from 'fastify';

import { CredentialsError, NotFoundError } from '../../../errors';
import { refreshTokensSchema } from '../../../libs/zod-schemas/refresh-tokens-schema';
import { makeCreateRefreshTokensUseCase } from '../../../use-cases/_factories/refresh-tokens/make-create-refresh-tokens-use-case';

export async function createRefreshTokensController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const { refreshTokenId } = request.body as { refreshTokenId: string };
    await refreshTokensSchema.parseAsync({ refreshTokenId });

    const createRefreshTokensUseCase = makeCreateRefreshTokensUseCase();
    const { refreshToken, user } =
      await createRefreshTokensUseCase.execute(refreshTokenId);

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

    return reply.status(201).send({
      refreshToken,
      token,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    if (error instanceof CredentialsError) {
      return reply.status(401).send({ error: error.message });
    }

    throw error;
  }
}
