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
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { CreateCategoriesUseCase } from '../categories/create';
import type { IProductsDto } from './dtos/products-dto';
import { UpdateProductsUseCase } from './update';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: UpdateProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
let newProductData: Omit<IProductsDto, 'imageUrls'>;
const categoryName = 'Category Name';

describe('Update Products', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new UpdateProductsUseCase(productsRepo, categoriesRepo);

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

    newProductData = {
      name: 'Updated Product Name',
      description: 'Updated Product Description',
      categoryId: category!.id,
      oldPrice: 20,
      currentPrice: 15,
      stockQuantity: 20,
      imageFiles: mockFiles,
    };

    await productsRepo.create({
      ...productData,
      categories: {
        connect: { id: productData.categoryId },
      },
    });
  });

  it('should update a product', async () => {
    const product = await productsRepo.findByName(productData.name);

    await sut.execute(product!.id, newProductData);

    const updatedProduct = await productsRepo.findByName(
      'Updated Product Name',
    );

    expect(updatedProduct).not.toBeNull();
  });

  it('should throw error if product not exists', async () => {
    await expect(sut.execute('invalid-id', productData)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should throw error if category not exists', async () => {
    const product = await productsRepo.findByName(productData.name);

    await expect(
      sut.execute(product!.id, { ...newProductData, categoryId: 'invalid-id' }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw error if product name already exixts', async () => {
    const product = await productsRepo.findByName(productData.name);

    await productsRepo.create({
      ...newProductData,
      categories: {
        connect: { id: newProductData.categoryId },
      },
    });

    await expect(
      sut.execute(product!.id, newProductData),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
