import { randomBytes } from 'node:crypto';

import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { forgotPasswordSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeForgotPasswordUseCase } from '../../../use-cases/_factories/users/make-forgot-password-use-case';

type TBody = {
  email: string;
};

export async function forgotPasswordController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { email } = request.body as TBody;
    await forgotPasswordSchema.parseAsync({
      email,
    });

    const resetToken = randomBytes(20).toString('hex');
    const resetTokenExpiresAt = new Date();
    const aditionalHours = 1;

    resetTokenExpiresAt.setHours(
      resetTokenExpiresAt.getHours() + aditionalHours,
    );

    const forgotPasswordUseCase = makeForgotPasswordUseCase();
    await forgotPasswordUseCase.execute(email, resetToken, resetTokenExpiresAt);

    return reply.status(200).send({
      message: 'Email sent successfully',
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
