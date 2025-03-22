import { UTApi } from 'uploadthing/server';

import type {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { AlreadyExistsError, ConflictError, NotFoundError } from '../../errors';
import type { IProductsDto } from './dtos/products-dto';

export class CreateProductsUseCase {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async execute(data: IProductsDto): Promise<void> {
    const product = await this.productsRepo.findByName(data.name);

    if (product) {
      throw new AlreadyExistsError('Product already exists');
    }

    const category = await this.categoriesRepo.findById(data.categoryId);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const createdProductData = {
      name: data.name,
      description: data.description,
      categories: {
        connect: {
          id: data.categoryId,
        },
      },
      oldPrice: data.oldPrice,
      currentPrice: data.currentPrice,
      stockQuantity: data.stockQuantity,
    };

    const utapi = new UTApi();

    const uploads = await Promise.all(
      data.imageFiles.map((file) => utapi.uploadFiles(file)),
    );

    const imageUrls: string[] = [];
    for (let i = 0; i < uploads.length; i++) {
      imageUrls.push(uploads[i].data?.ufsUrl as string);
    }

    await this.productsRepo
      .create(createdProductData)
      .then(async (product) => {
        await this.productsRepo.createImages(product.id, { imageUrls });
      })
      .catch(() => {
        throw new ConflictError('Error creating product');
      });
  }
}
