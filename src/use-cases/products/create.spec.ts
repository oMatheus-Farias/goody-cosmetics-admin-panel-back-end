import type { Category } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  InMemoryCategoriesRepository,
  InMemoryProductsRepository,
} from '../../database/repositories/in-memory';
import type {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from './create';
import type { IProductsDto } from './dtos/products-dto';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: CreateProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Create Products', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new CreateProductsUseCase(productsRepo, categoriesRepo);

    await categoriesUseCase.execute({ name: categoryName });
    category = await categoriesRepo.findByName(categoryName);

    productData = {
      name: 'Product Name',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageUrls: ['http://image-url.com', 'http://image-url.com'],
    };
  });

  it('should be able create product', async () => {
    await sut.execute(productData);

    const product = await productsRepo.findByName(productData.name);

    expect(product).not.toBe(null);
  });

  it('should throw error if product already exists', async () => {
    await sut.execute(productData);

    await expect(sut.execute(productData)).rejects.toBeInstanceOf(
      AlreadyExistsError,
    );
  });

  it('should throw error if category not exists', async () => {
    await expect(
      sut.execute({
        ...productData,
        categoryId: 'invalid-category-id',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
