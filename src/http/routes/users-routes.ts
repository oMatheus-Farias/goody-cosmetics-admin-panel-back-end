import type { FastifyInstance } from 'fastify';

import { createUsersController } from '../controllers/users/create';
import { verifyIfUserRoot, verifyJwt } from '../middlewares';

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    createUsersController,
  );
}
