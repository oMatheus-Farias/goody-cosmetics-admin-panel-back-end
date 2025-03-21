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
import { FindProductsByIdUseCase } from './find-by-id';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let sut: FindProductsByIdUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Find Products By Id', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    sut = new FindProductsByIdUseCase(productsRepo);

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

  it('should be able to find a product by id', async () => {
    const response = await productsRepo.findByName(productData.name);
    const product = await sut.execute(response!.id);

    expect(product).not.toBeNull();
  });

  it('should throw error if product not found', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
