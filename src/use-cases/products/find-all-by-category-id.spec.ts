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
import { CreateProductsUseCase } from './create';
import type { IProductsDto } from './dtos/products-dto';
import { FindAllProductsByCategoryIdUseCase } from './find-all-by-category-id';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let sut: FindAllProductsByCategoryIdUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData1: IProductsDto;
let productData2: IProductsDto;
const categoryName = 'Category Name';

describe('Find All Products By Category Id', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    sut = new FindAllProductsByCategoryIdUseCase(productsRepo, categoriesRepo);

    await categoriesUseCase.execute({ name: categoryName });
    category = await categoriesRepo.findByName(categoryName);

    const mockFiles = [
      new File(['http://image-url.com'], 'image.jpg', { type: 'image/jpeg' }),
      new File(['http://image-url.com'], 'image.jpg', { type: 'image/jpeg' }),
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

  it('should return all products from a category', async () => {
    const products = await sut.execute(category!.id);
    expect(products).toHaveLength(2);
  });

  it('should throw error if category does not exist', async () => {
    await expect(sut.execute('invalid-category-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
