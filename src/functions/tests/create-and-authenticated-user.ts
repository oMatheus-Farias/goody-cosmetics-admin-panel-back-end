import type { $Enums } from '@prisma/client';
import { hash } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';

import { prisma } from '../../app';

type TProps = {
  app: FastifyInstance;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: $Enums.UserRole;
  password?: string;
};

export async function createAndAuthenticatedUser({
  app,
  firstName = 'John',
  lastName = 'Doe',
  email = 'test@test.com',
  role = 'ADMIN',
  password = 'Teste@123',
}: TProps) {
  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      role,
      passwordHash,
    },
  });

  const { body } = await request(app.server)
    .post('/api/sessions/authentication')
    .send({
      email: user.email,
      password,
    });

  const { token, refreshToken } = body;
  return { token, refreshToken };
}
