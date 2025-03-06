import type { FastifyInstance } from 'fastify';

import { createCategoriesController } from '../controllers/categories/create';

export async function categoriesRoutes(app: FastifyInstance) {
  app.post('/', createCategoriesController);
}
