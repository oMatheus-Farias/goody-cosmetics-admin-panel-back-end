import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '../../../app';
import { createAndAuthenticatedUser } from '../../../functions/tests/create-and-authenticated-user';

describe('Update Category (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to update a category', async () => {
    const { token } = await createAndAuthenticatedUser({ app });

    await request(app.server)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Category 1',
      });

    const categories = await request(app.server).get('/api/categories');
    const categoryId = categories.body[0].id;

    const response = await request(app.server)
      .put(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Category 2',
      });

    expect(response.statusCode).toEqual(204);
  });
});
