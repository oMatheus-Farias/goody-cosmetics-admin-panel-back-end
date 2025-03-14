import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { DeleteCategoriesUseCase } from '../../categories/delete';

export function makeDeleteCategoriesUseCase(): DeleteCategoriesUseCase {
  const categoriesRepo = new PrismaCategoriesRepository();
  return new DeleteCategoriesUseCase(categoriesRepo);
}
