import { hash } from 'bcryptjs';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app, prisma } from '../../../app';

describe('Auth Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able authenticated user', async () => {
    const password = 'Teste@123';
    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
        role: 'ADMIN',
        passwordHash,
      },
    });

    const authResponse = await request(app.server)
      .post('/api/sessions/authentication')
      .send({
        email: user.email,
        password,
      });

    expect(authResponse.statusCode).toEqual(200);
    expect(authResponse.body).toEqual({
      token: expect.any(String),
      refreshToken: expect.any(String),
    });
  });
});
