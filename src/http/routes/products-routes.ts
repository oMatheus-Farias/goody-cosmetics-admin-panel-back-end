import type { FastifyInstance } from 'fastify';

import {
  createProductsController,
  findAllProductsByCategoryIdController,
  findAllProductsController,
  findAllProductsWithParamsController,
  findProductsByIdController,
  updateProductsController,
} from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/:productId', findProductsByIdController);
  app.get('/', findAllProductsController);
  app.get('/category/:categoryId', findAllProductsByCategoryIdController);
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllProductsWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
  app.put('/:productId', { onRequest: [verifyJwt] }, updateProductsController);
}
