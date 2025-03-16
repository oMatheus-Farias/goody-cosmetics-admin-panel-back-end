import {
  PrismaCategoriesRepository,
  PrismaProductsRepository,
} from '../../../database/repositories/prisma';
import { CreateProductsUseCase } from '../../products/create';

export function makeCreateProductsUseCase(): CreateProductsUseCase {
  const productsRepo = new PrismaProductsRepository();
  const categoriesRepo = new PrismaCategoriesRepository();
  return new CreateProductsUseCase(productsRepo, categoriesRepo);
}
