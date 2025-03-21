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
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from './create';
import type { IProductsDto } from './dtos/products-dto';
import { FindAllProductsUseCase } from './find-all';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let sut: FindAllProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Find All Products', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    sut = new FindAllProductsUseCase(productsRepo);

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

    await createProductsUseCase.execute(productData);
  });

  it('should be able to find all products', async () => {
    const products = await sut.execute();

    expect(products).toHaveLength(1);
  });
});
