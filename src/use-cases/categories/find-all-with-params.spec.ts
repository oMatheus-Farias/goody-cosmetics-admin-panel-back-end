import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from '../../database/repositories/in-memory';
import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from './create';
import { FindAllCategoriesWithParamsUseCase } from './find-all-with-params';

let categoriesRepo: CategoriesRepository;
let createCategoriesUseCase: CreateCategoriesUseCase;
let sut: FindAllCategoriesWithParamsUseCase;
const categoryData1 = {
  name: 'Category Name 01',
};
const categoryData2 = {
  name: 'Category Name 02',
};

describe('Find All Categories With Params', () => {
  beforeEach(async () => {
    categoriesRepo = new InMemoryCategoriesRepository();
    createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new FindAllCategoriesWithParamsUseCase(categoriesRepo);

    Promise.all([
      createCategoriesUseCase.execute(categoryData1),
      createCategoriesUseCase.execute(categoryData2),
    ]);
  });

  it('should be able find all categories', async () => {
    const categories = await sut.execute(0);

    expect(categories.categories).toHaveLength(2);
    expect(categories.meta).not.toBe(null);
  });
});
