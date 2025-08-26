import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { DeleteProductsUseCase } from '../../products/delete';

export function makeDeleteProductsUseCase(): DeleteProductsUseCase {
  const productsRepo = new PrismaProductsRepository();
  const salesRepo = new PrismaSalesRepository();
  return new DeleteProductsUseCase(productsRepo, salesRepo);
}
