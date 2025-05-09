import type { Category } from '@prisma/client';
import fs from 'fs';
import path from 'path';
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

    const mockFiles = [
      new File(
        [
          fs.readFileSync(
            path.resolve(__dirname, '../../../assets/test-image.jpg'),
          ),
        ],
        'image1.jpg',
        { type: 'image/jpeg' },
      ),
      new File(
        [
          fs.readFileSync(
            path.resolve(__dirname, '../../../assets/test-image.jpg'),
          ),
        ],
        'image2.jpg',
        { type: 'image/jpeg' },
      ),
    ];

    productData1 = {
      name: 'Product Name',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageFiles: mockFiles,
    };
    productData2 = {
      name: 'Product Name 2',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageFiles: mockFiles,
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

  it('should be able to find all products with params and search term', async () => {
    const products = await sut.execute(0, productData2.name);
    expect(products?.products).toHaveLength(1);
  });

  it('should not find any products with invalid search term', async () => {
    const products = await sut.execute(0, 'Invalid Product Name');
    expect(products?.products).toHaveLength(0);
  });
});
