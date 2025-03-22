import type { FastifyReply, FastifyRequest } from 'fastify';

import { NotFoundError } from '../../../errors';
import { processFile } from '../../../functions/process-file';
import { updateProductsImagesSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeUpdateProductsImagesUseCase } from '../../../use-cases/_factories/products/make-update-products-images-use-case';

type TParams = {
  imageId: string;
};

export async function updateProductsImagesController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const { imageId } = request.params as TParams;
    const formData = (await request.formData()) as FormData;

    const productImage = formData.get('productImage') as File;

    await updateProductsImagesSchema.parseAsync({
      imageId,
      productImage,
    });

    const imageFile = await processFile(productImage);

    const updateProductsImagesUseCase = makeUpdateProductsImagesUseCase();
    await updateProductsImagesUseCase.execute(imageId, imageFile);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }

    throw error;
  }
}
