import type { CategoriesRepository } from '../../database/repositories/interfaces';

export class FindAllCategoriesWithParamsUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(page: number, searchTerm?: string) {
    return await this.categoriesRepo.findAllWithParams(page, searchTerm);
  }
}
