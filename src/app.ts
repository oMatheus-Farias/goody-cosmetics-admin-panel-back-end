import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from './configs/env';
import {
  categoriesRoutes,
  productsRoutes,
  refreshTokensRoutes,
  sessionsRoutes,
  usersRoutes,
} from './http/routes';

export const app = Fastify();

export const prisma = new PrismaClient();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB de limite
  },
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
app.register(refreshTokensRoutes, {
  prefix: '/api/refresh-tokens',
});
app.register(productsRoutes, {
  prefix: '/api/products',
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
