import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '../../../app';

describe('Create Category (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should not be able to register a category, because the user is not authorized', async () => {
    const response = await request(app.server).post('/api/categories').send({
      name: 'Category 1',
    });

    expect(response.statusCode).toEqual(401);
  });
});
