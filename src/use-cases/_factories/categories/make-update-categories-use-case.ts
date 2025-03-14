import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { UpdateCategoriesUseCase } from '../../categories/update';

export function makeUpdateCategoriesUseCase(): UpdateCategoriesUseCase {
  const categoriesRepo = new PrismaCategoriesRepository();
  return new UpdateCategoriesUseCase(categoriesRepo);
}
