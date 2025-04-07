import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { signOutUsersSchema } from '../../../libs/zod-schemas/auth-users-schemas';
import { makeSignOutUsersUseCase } from '../../../use-cases/_factories/sessions/make-sign-out-users-use-case';

export async function signOutUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { sub: userId } = request.user as { sub: string };

    await signOutUsersSchema.parseAsync({
      userId,
    });

    const signOutUsersUseCase = makeSignOutUsersUseCase();
    await signOutUsersUseCase.execute(userId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
