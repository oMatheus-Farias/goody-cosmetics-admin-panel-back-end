import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from '../../database/repositories/in-memory';
import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from './create';
import { UpdateCategoriesUseCase } from './update';

let categoriesRepo: CategoriesRepository;
let createCategoriesUseCase: CreateCategoriesUseCase;
let sut: UpdateCategoriesUseCase;
const categoryData = {
  name: 'Category Name',
};

describe('Update Categories', () => {
  beforeEach(async () => {
    categoriesRepo = new InMemoryCategoriesRepository();
    createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new UpdateCategoriesUseCase(categoriesRepo);

    await createCategoriesUseCase.execute(categoryData);
  });

  it('should be able update category', async () => {
    const category = await categoriesRepo.findByName(categoryData.name);
    await sut.execute(category!.id, { name: 'New Category Name' });

    const updatedCategory = await categoriesRepo.findById(category!.id);

    expect(updatedCategory!.name).toBe('New Category Name');
  });
});
