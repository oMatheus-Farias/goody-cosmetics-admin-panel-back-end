import type { FastifyInstance } from 'fastify';

import { createProductsController } from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
}
