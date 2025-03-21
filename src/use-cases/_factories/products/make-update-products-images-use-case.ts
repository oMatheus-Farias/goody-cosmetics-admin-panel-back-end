import { PrismaProductsRepository } from '../../../database/repositories/prisma';
import { UpdateProductsImagesUseCase } from '../../products/update-images';

export function makeUpdateProductsImagesUseCase(): UpdateProductsImagesUseCase {
  const productsRepo = new PrismaProductsRepository();
  return new UpdateProductsImagesUseCase(productsRepo);
}
