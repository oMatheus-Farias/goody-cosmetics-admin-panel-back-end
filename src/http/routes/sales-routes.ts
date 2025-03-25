import type { FastifyInstance } from 'fastify';

import {
  createSalesController,
  findAllSalesWithParamsController,
  updateSalesController,
} from '../controllers/sales';
import { verifyJwt } from '../middlewares';

export async function salesRoutes(app: FastifyInstance) {
  app.get(
    '/params',
    { onRequest: [verifyJwt] },
    findAllSalesWithParamsController,
  );
  app.post('/', { onRequest: [verifyJwt] }, createSalesController);
  app.patch('/:saleId', { onRequest: [verifyJwt] }, updateSalesController);
}
