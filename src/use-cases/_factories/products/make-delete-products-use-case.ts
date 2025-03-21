import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { DeleteProductsUseCase } from '../../products/delete';

export function makeDeleteProductsUseCase(): DeleteProductsUseCase {
  const productsRepo = new PrismaProductsRepository();
  return new DeleteProductsUseCase(productsRepo);
}
