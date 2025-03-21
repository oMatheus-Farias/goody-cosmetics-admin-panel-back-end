import type { ProductsRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class UpdateProductsImagesUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(imageId: string, imageUrl: string): Promise<void> {
    const image = await this.productsRepo.findImagesById(imageId);

    if (!image) {
      throw new NotFoundError('Image not found');
    }

    await this.productsRepo.updateImages(imageId, imageUrl);
  }
}
