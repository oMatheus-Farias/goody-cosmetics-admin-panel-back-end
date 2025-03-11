import type { FastifyInstance } from 'fastify';

import { createRefreshTokensController } from '../controllers/refresh-tokens/create';

export async function refreshTokensRoutes(app: FastifyInstance) {
  app.post('/', createRefreshTokensController);
}
