import type { FastifyInstance } from 'fastify';

import {
  createUsersController,
  findAllWithParamsController,
} from '../controllers/users';
import { verifyIfUserRoot, verifyJwt } from '../middlewares';

export async function usersRoutes(app: FastifyInstance) {
  app.get(
    '/params',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    findAllWithParamsController,
  );
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    createUsersController,
  );
}
