import type { FastifyInstance } from 'fastify';

import { createSalesController } from '../controllers/sales';
import { verifyJwt } from '../middlewares';

export async function salesRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, createSalesController);
}
