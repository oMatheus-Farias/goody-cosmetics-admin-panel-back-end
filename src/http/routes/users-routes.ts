import type { FastifyInstance } from 'fastify';

import { createUsersController } from '../controllers/users/create';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', createUsersController);
}
