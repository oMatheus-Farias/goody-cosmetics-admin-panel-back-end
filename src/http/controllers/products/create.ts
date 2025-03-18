import { randomUUID } from 'node:crypto';
import path from 'node:path';

import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  AlreadyExistsError,
  ConflictError,
  NotFoundError,
} from '../../../errors';
import { extractCreateProductsFormData } from '../../../functions/extract-create-products-form-data';
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

    const fieldnameImage01 = formFields.image01.name;
    const ext1 = path.extname(fieldnameImage01);
    const newFileNameImage01 = `${fieldnameImage01}-${randomUUID()}${ext1}`;

    const fieldnameImage02 = formFields.image02.name;
    const ext2 = path.extname(fieldnameImage02);
    const newFileNameImage02 = `${fieldnameImage02}-${randomUUID()}${ext2}`;
    // const buffer = await image01.arrayBuffer();

    const imageUrls = [
      `http://fake-url/${newFileNameImage01}`,
      `http://fake-url/${newFileNameImage02}`,
    ];

    const createProductsUseCase = makeCreateProductsUseCase();
    await createProductsUseCase.execute({
      name: formFields.name,
      description: formFields.description,
      categoryId: formFields.categoryId,
      oldPrice: formFields.oldPrice,
      currentPrice: formFields.currentPrice,
      stockQuantity: formFields.stockQuantity,
      imageUrls,
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
