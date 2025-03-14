import type { Category } from '@prisma/client';

import type { CategoriesRepository } from '../../database/repositories/interfaces';

export class FindAllCategoriesUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(): Promise<Pick<Category, 'id' | 'name'>[] | null> {
    return this.categoriesRepo.findAll();
  }
}
