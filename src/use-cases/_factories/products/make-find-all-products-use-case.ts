import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { FindAllProductsUseCase } from '../../products/find-all';

export function makeFindAllProductsUseCase(): FindAllProductsUseCase {
  const productsRepo = new PrismaProductsRepository();
  return new FindAllProductsUseCase(productsRepo);
}
