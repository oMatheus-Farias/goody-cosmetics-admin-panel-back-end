import type { Category } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  InMemoryCategoriesRepository,
  InMemoryProductsRepository,
} from '../../database/repositories/in-memory';
import {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import { CreateCategoriesUseCase } from '../categories/create';
import type { IProductsDto } from './dtos/products-dto';
import { UpdateProductsImagesUseCase } from './update-images';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: UpdateProductsImagesUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Update Products Images', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new UpdateProductsImagesUseCase(productsRepo);

    await categoriesUseCase.execute({ name: categoryName });
    category = await categoriesRepo.findByName(categoryName);

    const mockFiles = [
      new File(['http://image-url.com'], 'image.jpg', { type: 'image/jpeg' }),
      new File(['http://image-url.com'], 'image.jpg', { type: 'image/jpeg' }),
    ];

    productData = {
      name: 'Product Name',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageFiles: mockFiles,
    };

    await productsRepo.create({
      ...productData,
      categories: {
        connect: { id: productData.categoryId },
      },
    });
  });

  it('should update product images', async () => {
    const response = await productsRepo.findByName(productData.name);
    const product = await productsRepo.findById(response!.id);

    const newImageUrl = 'http://new-image-url.com';
    const mockFile = new File([newImageUrl], 'image.jpg', {
      type: 'image/jpeg',
    });

    await expect(
      sut.execute(product?.productImage[0].id as string, mockFile),
    ).resolves.toBeUndefined();
  });

  it('should throw error if image not found', async () => {
    const newImageUrl = 'http://new-image-url.com';

    await expect(
      sut.execute(
        'invalid-image-id',
        new File([newImageUrl], 'image.jpg', { type: 'image/jpeg' }),
      ),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
