import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { findAllProductsByIdSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeFindProductsByIdUseCase } from '../../../use-cases/_factories/products/make-find-products-by-id';

type TParams = {
  productId: string;
};

export async function findProductsByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { productId } = request.params as TParams;

    await findAllProductsByIdSchema.parseAsync({ productId });
    const findProductsByIdUseCase = makeFindProductsByIdUseCase();

    const product = await findProductsByIdUseCase.execute(productId);
    return reply.status(200).send(product);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
