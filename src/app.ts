import { fastifyCors } from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';
import { createRouteHandler } from 'uploadthing/fastify';
import { ZodError } from 'zod';

import { env } from './configs/env';
import {
  categoriesRoutes,
  productsRoutes,
  refreshTokensRoutes,
  sessionsRoutes,
  usersRoutes,
} from './http/routes';
import { salesRoutes } from './http/routes/sales-routes';
import { uploadRouter } from './libs/uploadthing/config-uploadthing';

export const app = Fastify();

export const prisma = new PrismaClient();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB de limite
  },
});

app.register(createRouteHandler, {
  router: uploadRouter,
  config: {
    token: env.UPLOADTHING_TOKEN,
    logLevel: 'None',
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
app.register(salesRoutes, {
  prefix: '/api/sales',
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
