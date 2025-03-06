import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { CreateCategoriesUseCase } from '../../categories';

export function makeCreateCategoriesUseCase() {
  const categoriesRepo = new PrismaCategoriesRepository();
  return new CreateCategoriesUseCase(categoriesRepo);
}
