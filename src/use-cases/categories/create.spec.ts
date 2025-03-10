import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from '../../database/repositories/in-memory';
import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from './create';

let categoriesRepo: CategoriesRepository;
let sut: CreateCategoriesUseCase;
const categoryData = {
  name: 'Category Name',
};

describe('Create Category', () => {
  beforeEach(async () => {
    categoriesRepo = new InMemoryCategoriesRepository();
    sut = new CreateCategoriesUseCase(categoriesRepo);

    await sut.execute(categoryData);
  });

  it('should be able create category', async () => {
    const category = await categoriesRepo.findByName(categoryData.name);

    expect(category).not.toBe(null);
  });
});
