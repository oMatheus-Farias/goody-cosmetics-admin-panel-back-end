import type { FastifyInstance } from 'fastify';

import {
  createProductsController,
  deleteProductsController,
  findAllProductsByCategoryIdController,
  findAllProductsController,
  findAllProductsWithParamsController,
  findProductsByIdController,
  updateProductsController,
  updateProductsImagesController,
} from '../controllers/products';
import { verifyJwt } from '../middlewares';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/:productId', findProductsByIdController);
  app.get('/', findAllProductsController);
  app.get('/category', findAllProductsByCategoryIdController);
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllProductsWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createProductsController);
  app.put('/:productId', { onRequest: [verifyJwt] }, updateProductsController);
  app.put(
    '/images/:imageId',
    { onRequest: [verifyJwt] },
    updateProductsImagesController,
  );
  app.delete(
    '/:productId',
    { onRequest: [verifyJwt] },
    deleteProductsController,
  );
}
