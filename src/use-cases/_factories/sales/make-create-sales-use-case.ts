import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { CreateSalesUseCase } from '../../sales/create';

export function makeCreateSalesUseCase(): CreateSalesUseCase {
  const salesRepo = new PrismaSalesRepository();
  const productsRepo = new PrismaProductsRepository();
  return new CreateSalesUseCase(salesRepo, productsRepo);
}
