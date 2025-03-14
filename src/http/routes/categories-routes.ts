import type { FastifyInstance } from 'fastify';

import {
  createCategoriesController,
  findAllCategoriesWithParamsController,
} from '../controllers/categories';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function categoriesRoutes(app: FastifyInstance) {
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllCategoriesWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createCategoriesController);
}
