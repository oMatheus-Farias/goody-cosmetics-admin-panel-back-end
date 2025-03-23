import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { updateSalesSchema } from '../../../libs/zod-schemas/sales-schemas';
import { makeUpdateSalesUseCase } from '../../../use-cases/_factories/sales/make-update-sales-use-case';
import type { IUpdateSalesDto } from '../../../use-cases/sales/dtos';

type TParams = {
  saleId: string;
};

export async function updateSalesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { saleId } = request.params as TParams;
    const data = request.body as Omit<IUpdateSalesDto, 'saleId'>;

    await updateSalesSchema.parseAsync({
      saleId,
      ...data,
    });

    const updateSalesUseCase = makeUpdateSalesUseCase();
    await updateSalesUseCase.execute({
      ...data,
      saleId,
    });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
