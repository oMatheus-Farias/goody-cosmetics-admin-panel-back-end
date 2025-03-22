import { UTApi } from 'uploadthing/server';

import type { ProductsRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class UpdateProductsImagesUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(imageId: string, imageFile: File): Promise<void> {
    const image = await this.productsRepo.findImagesById(imageId);

    if (!image) {
      throw new NotFoundError('Image not found');
    }

    const utapi = new UTApi();

    const upload = utapi.uploadFiles(imageFile);

    const imageUrl = (await upload).data?.ufsUrl as string;

    await this.productsRepo.updateImages(imageId, imageUrl);
  }
}
