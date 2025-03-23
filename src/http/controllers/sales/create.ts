import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { createSalesSchema } from '../../../libs/zod-schemas/sales-schemas';
import { makeCreateSalesUseCase } from '../../../use-cases/_factories/sales/make-create-sales-use-case';
import type { ICreateSalesDto } from '../../../use-cases/sales/dtos';

export async function createSalesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const data = request.body as ICreateSalesDto;
    await createSalesSchema.parseAsync({ ...data });

    const createSalesUseCase = makeCreateSalesUseCase();
    await createSalesUseCase.execute(data);

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
