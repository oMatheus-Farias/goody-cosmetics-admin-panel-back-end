import type { ProductsRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class DeleteProductsUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productsRepo.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    await Promise.all([
      this.productsRepo.deleteImages(product.id),
      this.productsRepo.delete(product.id),
    ]);
  }
}
