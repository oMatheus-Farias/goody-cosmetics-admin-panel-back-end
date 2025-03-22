import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  AlreadyExistsError,
  ConflictError,
  NotFoundError,
} from '../../../errors';
import { extractCreateProductsFormData } from '../../../functions/extract-create-products-form-data';
import { processFile } from '../../../functions/process-file';
import { createProductsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeCreateProductsUseCase } from '../../../use-cases/_factories/products/make-create-products-use-case';

export async function createProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const formData = (await request.formData()) as FormData;
    const formFields = extractCreateProductsFormData(formData);

    await createProductsSchema.parseAsync({
      ...formFields,
    });

    const imageFiles = await Promise.all([
      processFile(formFields.image01),
      processFile(formFields.image02),
    ]);

    const createProductsUseCase = makeCreateProductsUseCase();
    await createProductsUseCase.execute({
      name: formFields.name,
      description: formFields.description,
      categoryId: formFields.categoryId,
      oldPrice: formFields.oldPrice,
      currentPrice: formFields.currentPrice,
      stockQuantity: formFields.stockQuantity,
      imageFiles,
    });

    return reply.status(201).send({ message: 'Product created' });
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      return reply.status(409).send({ error: error.message });
    }
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message });
    }
    if (error instanceof ConflictError) {
      return reply.status(409).send({ error: error.message });
    }

    throw error;
  }
}
