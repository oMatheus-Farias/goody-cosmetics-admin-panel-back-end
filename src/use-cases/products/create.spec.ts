import { Category } from '@prisma/client';
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

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: CreateProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
const categoryName = 'Category Name';

describe('Create Product', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new CreateProductsUseCase(productsRepo, categoriesRepo);

    await categoriesUseCase.execute({ name: categoryName });
    category = await categoriesRepo.findByName(categoryName);
  });

  it('should be able create product', async () => {
    await sut.execute({
      name: 'Product Name',
      description: 'Product Description',
      categoryId: category!.id,
      oldPrice: 10,
      currentPrice: 5,
      stockQuantity: 10,
      imageUrls: ['http://image-url.com', 'http://image-url.com'],
    });

    const product = await productsRepo.findByName('Product Name');

    expect(product).not.toBe(null);
  });
});
