import type { FastifyInstance } from 'fastify';

import { authUsersController } from '../controllers/sessions/auth-users';

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/authentication', authUsersController);
}
