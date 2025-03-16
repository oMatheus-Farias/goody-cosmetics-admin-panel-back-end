import { randomUUID } from 'node:crypto';
import path from 'node:path';

import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  AlreadyExistsError,
  ConflictError,
  NotFoundError,
} from '../../../errors';
import { createProductsSchema } from '../../../libs/zod-schemas/products-schemas';
import { makeCreateProductsUseCase } from '../../../use-cases/_factories/products/make-create-products-use-case';

export async function createProductsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> {
  try {
    const formData = (await request.formData()) as FormData;

    //TODO: Refactor code
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const oldPrice = Number(formData.get('oldPrice'));
    const currentPrice = Number(formData.get('currentPrice'));
    const stockQuantity = Number(formData.get('stockQuantity'));
    const image01 = formData.get('image01') as File;
    const image02 = formData.get('image02') as File;

    await createProductsSchema.parseAsync({
      name,
      description,
      categoryId,
      oldPrice,
      currentPrice,
      stockQuantity,
      image01,
      image02,
    });

    const fieldnameImage01 = image01.name;
    const ext1 = path.extname(fieldnameImage01);
    const newFileNameImage01 = `${fieldnameImage01}-${randomUUID()}${ext1}`;

    const fieldnameImage02 = image02.name;
    const ext2 = path.extname(fieldnameImage02);
    const newFileNameImage02 = `${fieldnameImage02}-${randomUUID()}${ext2}`;
    // const buffer = await image01.arrayBuffer();

    const fakeUrlImage01 = `http://fake-url/${newFileNameImage01}`;
    const fakeUrlImage02 = `http://fake-url/${newFileNameImage02}`;

    const createProductsUseCase = makeCreateProductsUseCase();
    await createProductsUseCase.execute({
      name,
      description,
      categoryId,
      oldPrice,
      currentPrice,
      stockQuantity,
      imageUrl01: fakeUrlImage01,
      imageUrl02: fakeUrlImage02,
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
