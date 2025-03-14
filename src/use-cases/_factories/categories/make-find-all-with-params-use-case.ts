import { PrismaCategoriesRepository } from '../../../database/repositories/prisma';
import { FindAllCategoriesWithParamsUseCase } from '../../categories/find-all-with-params';

export function makeFindAllCategoriesWithParamsUseCase(): FindAllCategoriesWithParamsUseCase {
  const cateroriesRepo = new PrismaCategoriesRepository();
  return new FindAllCategoriesWithParamsUseCase(cateroriesRepo);
}
