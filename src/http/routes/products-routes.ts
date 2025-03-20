import type { FastifyInstance } from 'fastify';

import {
  createProductsController,
  findAllProductsController,
} from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', findAllProductsController);
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
}
