import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { FindProductsByIdUseCase } from '../../products/find-by-id';

export function makeFindProductsByIdUseCase(): FindProductsByIdUseCase {
  const productsRepo = new PrismaProductsRepository();
  return new FindProductsByIdUseCase(productsRepo);
}
