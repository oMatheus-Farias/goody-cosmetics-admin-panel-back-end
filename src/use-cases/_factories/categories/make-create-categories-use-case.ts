import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { CreateCategoriesUseCase } from '../../categories/create';

export function makeCreateCategoriesUseCase(): CreateCategoriesUseCase {
  const categoriesRepo = new PrismaCategoriesRepository();
  return new CreateCategoriesUseCase(categoriesRepo);
}
