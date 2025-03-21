import {
  PrismaCategoriesRepository,
  PrismaProductsRepository,
} from '../../../database/repositories/prisma';
import { FindAllProductsByCategoryIdUseCase } from '../../products/find-all-by-category-id';

export function makeFindAllProductsByCategoryIdUseCase(): FindAllProductsByCategoryIdUseCase {
  const productsRepo = new PrismaProductsRepository();
  const categoriesRepo = new PrismaCategoriesRepository();
  return new FindAllProductsByCategoryIdUseCase(productsRepo, categoriesRepo);
}
