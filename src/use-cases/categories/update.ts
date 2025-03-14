import type { Prisma } from '@prisma/client';

import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { AlreadyExistsError, NotFoundError } from '../../errors';

export class UpdateCategoriesUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<void> {
    const category = await this.categoriesRepo.findById(categoryId);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    if (category.name) {
      const categoryWithSameName = await this.categoriesRepo.findByName(
        data.name as string,
      );

      if (categoryWithSameName) {
        throw new AlreadyExistsError('Category with this name already exists');
      }
    }

    await this.categoriesRepo.update(categoryId, data);
  }
}
