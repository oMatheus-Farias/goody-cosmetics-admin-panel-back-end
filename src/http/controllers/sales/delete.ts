import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { deleteSalesSchema } from '../../../libs/zod-schemas/sales-schemas';
import { makeDeleteSalesUseCase } from '../../../use-cases/_factories/sales/make-delete-sales-use-case';

type TParams = {
  saleId: string;
};

export async function deleteSalesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { saleId } = request.params as TParams;
    await deleteSalesSchema.parseAsync({ saleId });

    const deleteSalesUseCase = makeDeleteSalesUseCase();
    await deleteSalesUseCase.execute(saleId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
