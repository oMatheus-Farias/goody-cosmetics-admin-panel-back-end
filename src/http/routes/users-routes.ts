import type { FastifyInstance } from 'fastify';

import {
  createUsersController,
  deleteUsersController,
  findAllWithParamsController,
  findByIdUserController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
  updateUsersController,
} from '../controllers/users';
import { verifyIfUserRoot, verifyJwt } from '../middlewares';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJwt] }, findByIdUserController);
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
  app.post('/forgot-password', forgotPasswordController);
  app.patch(
    '/:userId',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    updateUsersController,
  );
  app.patch('/reset-password', resetPasswordController);
  app.put('/', { onRequest: [verifyJwt] }, updatePasswordController);
  app.delete(
    '/:userId',
    { onRequest: [verifyJwt, verifyIfUserRoot] },
    deleteUsersController,
  );
}
