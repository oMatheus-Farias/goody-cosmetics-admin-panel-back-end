import fastifyJwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from './configs/env';
import { categoriesRoutes, sessionsRoutes, usersRoutes } from './http/routes';

export const app = Fastify();

export const prisma = new PrismaClient();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes, {
  prefix: '/api/users',
});
app.register(sessionsRoutes, {
  prefix: '/api/sessions',
});
app.register(categoriesRoutes, {
  prefix: '/api/categories',
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ error: error.errors[0].message });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  reply.status(500).send({ error: 'Internal server error' });
});
