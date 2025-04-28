import type {
  CategoriesRepository,
  ProductsRepository,
  TProduct,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import type { TOrdenation } from './interfaces/ordenation-types';

export class FindAllProductsByCategoryIdUseCase {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async execute(
    categoryId?: string,
    ordernation?: TOrdenation,
  ): Promise<TProduct[] | null> {
    if (categoryId) {
      const category = await this.categoriesRepo.findById(categoryId);

      if (!category) {
        throw new NotFoundError('Category not found');
      }
    }

    return await this.productsRepo.findAllByCategory(categoryId, ordernation);
  }
}
