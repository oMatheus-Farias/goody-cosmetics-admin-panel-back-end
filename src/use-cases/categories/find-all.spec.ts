import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from '../../database/repositories/in-memory';
import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from './create';
import { FindAllCategoriesUseCase } from './find-all';

let categoriesRepo: CategoriesRepository;
let createCategoriesUseCase: CreateCategoriesUseCase;
let sut: FindAllCategoriesUseCase;
const categoryData1 = {
  name: 'Category Name 01',
};
const categoryData2 = {
  name: 'Category Name 02',
};

describe('Find All Categories', () => {
  beforeEach(async () => {
    categoriesRepo = new InMemoryCategoriesRepository();
    createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new FindAllCategoriesUseCase(categoriesRepo);

    Promise.all([
      createCategoriesUseCase.execute(categoryData1),
      createCategoriesUseCase.execute(categoryData2),
    ]);
  });

  it('should be able find all categories', async () => {
    const categories = await sut.execute();

    expect(categories).toHaveLength(2);
  });
});
