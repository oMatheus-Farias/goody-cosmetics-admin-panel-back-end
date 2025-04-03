import type { FastifyReply, FastifyRequest } from 'fastify';

import { CredentialsError, NotFoundError } from '../../../errors';
import { updatePasswordSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeUpdatePasswordUseCase } from '../../../use-cases/_factories/users/make-update-password-use-case';

type TBody = {
  oldPassword: string;
  newPassword: string;
};

export async function updatePasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { sub: userId } = request.user as { sub: string };
    const { oldPassword, newPassword } = request.body as TBody;

    await updatePasswordSchema.parseAsync({
      userId,
      oldPassword,
      newPassword,
    });

    const updatePasswordUseCase = makeUpdatePasswordUseCase();
    await updatePasswordUseCase.execute(userId, oldPassword, newPassword);
    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof CredentialsError) {
      return reply.status(401).send({ error: error.message });
    }

    throw error;
  }
}
