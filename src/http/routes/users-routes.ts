import type { FastifyInstance } from 'fastify';

import {
  createUsersController,
  deleteUsersController,
  findAllWithParamsController,
  updatePasswordController,
  updateUsersController,
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
  app.patch(
    '/:userId',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    updateUsersController,
  );
  app.put('/', { onRequest: [verifyJwt] }, updatePasswordController);
  app.delete(
    '/:userId',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    deleteUsersController,
  );
}
