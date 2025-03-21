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
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from './create';
import type { IProductsDto } from './dtos/products-dto';
import { FindAllProductsWithParamsUseCase } from './find-all-with-params';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let sut: FindAllProductsWithParamsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData1: IProductsDto;
let productData2: IProductsDto;
const categoryName = 'Category Name';

describe('Find All Products With Params', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    sut = new FindAllProductsWithParamsUseCase(productsRepo);

    await categoriesUseCase.execute({ name: categoryName });
    category = await categoriesRepo.findByName(categoryName);

    productData1 = {
      name: 'Product Name',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageUrls: ['http://image-url.com', 'http://image-url.com'],
    };
    productData2 = {
      name: 'Product Name 2',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageUrls: ['http://image-url.com', 'http://image-url.com'],
    };

    await Promise.all([
      createProductsUseCase.execute(productData1),
      createProductsUseCase.execute(productData2),
    ]);
  });

  it('should be able to find all products with params', async () => {
    const products = await sut.execute(0);
    expect(products?.products).toHaveLength(2);
  });
});
