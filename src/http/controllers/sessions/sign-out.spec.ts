import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '../../../app';
import { createAndAuthenticatedUser } from '../../../functions/tests/create-and-authenticated-user';

describe('Sign Out (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should log out of the user session', async () => {
    const { token } = await createAndAuthenticatedUser({ app });

    const response = await request(app.server)
      .delete('/api/sessions/sign-out')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toEqual(204);
  });

  it('should not be able to log out of the user session without authentication', async () => {
    const response = await request(app.server).delete('/api/sessions/sign-out');

    expect(response.statusCode).toEqual(401);
  });
});
