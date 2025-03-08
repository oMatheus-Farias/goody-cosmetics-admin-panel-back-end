import type { Prisma } from '@prisma/client';

import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { AlreadyExistsError } from '../../errors/already-exists-error';

export class CreateCategoriesUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(data: Prisma.CategoryCreateInput): Promise<void> {
    const category = await this.categoriesRepo.findByName(data.name);

    if (category) {
      throw new AlreadyExistsError('Category already exists');
    }

    await this.categoriesRepo.create(data);
  }
}
