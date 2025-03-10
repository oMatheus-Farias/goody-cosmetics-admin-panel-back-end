import type { FastifyInstance } from 'fastify';

import { createCategoriesController } from '../controllers/categories/create';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function categoriesRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, createCategoriesController);
}
