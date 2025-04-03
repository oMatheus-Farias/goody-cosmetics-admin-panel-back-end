import type { FastifyReply, FastifyRequest } from 'fastify';

import { CredentialsError, NotFoundError } from '../../../errors';
import { resetPasswordSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeResetPasswordUseCase } from '../../../use-cases/_factories/users/make-reset-password-use-case';

type TBody = {
  email: string;
  token: string;
  newPassword: string;
};

export async function resetPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { email, token, newPassword } = request.body as TBody;
    await resetPasswordSchema.parseAsync({
      email,
      token,
      newPassword,
    });

    const resetPasswordUseCase = makeResetPasswordUseCase();
    await resetPasswordUseCase.execute(email, token, newPassword);

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
