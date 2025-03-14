import type { FastifyInstance } from 'fastify';

import {
  createCategoriesController,
  deleteCategoriesController,
  findAllCategoriesController,
  findAllCategoriesWithParamsController,
  updateCategoriesController,
} from '../controllers/categories';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJwt] }, findAllCategoriesController);
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllCategoriesWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createCategoriesController);
  app.put(
    '/:categoryId',
    { onRequest: [verifyJwt] },
    updateCategoriesController,
  );
  app.delete(
    '/:categoryId',
    { onRequest: [verifyJwt] },
    deleteCategoriesController,
  );
}
