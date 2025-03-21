import { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { deleteProductsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeDeleteProductsUseCase } from '../../../use-cases/_factories/products/make-delete-products-use-case';

type TParams = {
  productId: string;
};

export async function deleteProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { productId } = request.params as TParams;
    await deleteProductsSchema.parseAsync({ productId });

    const deleteProductsUseCase = makeDeleteProductsUseCase();
    await deleteProductsUseCase.execute(productId);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
