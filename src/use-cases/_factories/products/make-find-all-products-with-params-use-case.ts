import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { FindAllProductsWithParamsUseCase } from '../../products/find-all-with-params';

export function makeFindAllProductsWithParamsUseCase(): FindAllProductsWithParamsUseCase {
  const productsRepo = new PrismaProductsRepository();
  return new FindAllProductsWithParamsUseCase(productsRepo);
}
