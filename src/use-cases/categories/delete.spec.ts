import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCategoriesRepository } from '../../database/repositories/in-memory';
import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from './create';
import { DeleteCategoriesUseCase } from './delete';

let categoriesRepo: CategoriesRepository;
let createCategoriesUseCase: CreateCategoriesUseCase;
let sut: DeleteCategoriesUseCase;
const categoryData = {
  name: 'Category Name',
};

describe('Delete Categories', () => {
  beforeEach(async () => {
    categoriesRepo = new InMemoryCategoriesRepository();
    createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new DeleteCategoriesUseCase(categoriesRepo);

    await createCategoriesUseCase.execute(categoryData);
  });

  it('should to delete categorie', async () => {
    const category = await categoriesRepo.findByName(categoryData.name);
    await sut.execute(category!.id);

    const deletedCategory = await categoriesRepo.findById(category!.id);

    expect(deletedCategory).toBe(null);
  });
});
