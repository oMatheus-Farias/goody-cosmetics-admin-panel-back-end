import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { FindAllCategoriesUseCase } from '../../categories/find-all';

export function makeFindAllCategoriesUseCase(): FindAllCategoriesUseCase {
  const categoriesRepo = new PrismaCategoriesRepository();
  return new FindAllCategoriesUseCase(categoriesRepo);
}
