import type { Category } from '@prisma/client';

import type { CategoriesRepository } from '../../database/repositories/interfaces';

export class FindAllCategoriesWithParamsUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(
    page: number,
    searchTerm?: string,
  ): Promise<{
    categories: Category[] | null;
    meta: {
      pageIndex: number;
      limit: number;
      countPerPage: number;
      totalCount: number;
    };
  }> {
    return await this.categoriesRepo.findAllWithParams(page, searchTerm);
  }
}
