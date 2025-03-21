import type { FastifyInstance } from 'fastify';

import {
  createProductsController,
  findAllProductsByCategoryIdController,
  findAllProductsController,
  findAllProductsWithParamsController,
} from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', findAllProductsController);
  app.get(
    '/category/:categoryId',
    { onRequest: [verifyJwt] },
    findAllProductsByCategoryIdController,
  );
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllProductsWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
}
