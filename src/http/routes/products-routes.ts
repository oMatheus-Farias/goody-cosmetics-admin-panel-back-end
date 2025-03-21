import type { FastifyInstance } from 'fastify';

import {
  createProductsController,
  findAllProductsController,
  findAllProductsWithParamsController,
} from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', findAllProductsController);
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllProductsWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
}
