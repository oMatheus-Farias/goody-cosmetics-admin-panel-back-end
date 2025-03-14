import type { CategoriesRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class DeleteCategoriesUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(categoryId: string): Promise<void> {
    const category = await this.categoriesRepo.findById(categoryId);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    await this.categoriesRepo.delete(categoryId);
  }
}
