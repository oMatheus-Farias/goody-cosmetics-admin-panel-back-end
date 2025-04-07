import type { FastifyInstance } from 'fastify';

import {
  authUsersController,
  signOutUsersController,
} from '../controllers/sessions';
import { verifyJwt } from '../middlewares';

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/authentication', authUsersController);
  app.delete('/sign-out', { onRequest: [verifyJwt] }, signOutUsersController);
}
