import type {
  CategoriesRepository,
  TFindAllWithParams,
} from '../../database/repositories/interfaces';

export class FindAllCategoriesWithParamsUseCase {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async execute(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams> {
    return await this.categoriesRepo.findAllWithParams(page, searchTerm);
  }
}
