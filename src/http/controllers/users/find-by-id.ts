import { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { findByIdUserSchema } from '../../../libs/zod-schemas/users-schemas';
import { makeFindByIdUserUseCase } from '../../../use-cases/_factories/users/make-find-by-id-user-use-case';

export async function findByIdUserController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { sub: userId } = request.user as { sub: string };
    await findByIdUserSchema.parseAsync({ userId });

    const findByIdUserUseCase = makeFindByIdUserUseCase();
    const user = await findByIdUserUseCase.execute(userId);

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
