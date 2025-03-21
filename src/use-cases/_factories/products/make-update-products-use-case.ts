import {
  PrismaCategoriesRepository,
  PrismaProductsRepository,
} from '../../../database/repositories/prisma';
import { UpdateProductsUseCase } from '../../products/update';

export function makeUpdateProductsUseCase(): UpdateProductsUseCase {
  const productsRepo = new PrismaProductsRepository();
  const categoriesRepo = new PrismaCategoriesRepository();
  return new UpdateProductsUseCase(productsRepo, categoriesRepo);
}
