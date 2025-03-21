import type { FastifyReply, FastifyRequest } from 'fastify';

import { AlreadyExistsError, NotFoundError } from '../../../errors';
import { updateProductsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeUpdateProductsUseCase } from '../../../use-cases/_factories/products/make-update-products-use-case';
import type { IProductsDto } from '../../../use-cases/products/dtos/products-dto';

type TParams = {
  productId: string;
};

export async function updateProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { productId } = request.params as TParams;
    const data = request.body as Partial<Omit<IProductsDto, 'imageUrls'>>;

    await updateProductsSchema.parseAsync({
      productId,
      ...data,
    });

    const updateProductsUseCase = makeUpdateProductsUseCase();
    await updateProductsUseCase.execute(productId, data);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
