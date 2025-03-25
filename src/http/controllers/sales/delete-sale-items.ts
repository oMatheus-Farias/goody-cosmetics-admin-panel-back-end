import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { deleteSaleItemsSchema } from '../../../libs/zod-schemas/sales-schemas';
import { makeDeleteSaleItemsUseCase } from '../../../use-cases/_factories/sales/make-delete-sale-items-use-case';

type TParams = {
  saleItemId: string;
};

export async function deleteSaleItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { saleItemId } = request.params as TParams;
    await deleteSaleItemsSchema.parseAsync({ saleItemId });

    const deleteSaleItemsUseCase = makeDeleteSaleItemsUseCase();
    await deleteSaleItemsUseCase.execute(saleItemId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
