import type { Category } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  InMemoryCategoriesRepository,
  InMemoryProductsRepository,
} from '../../database/repositories/in-memory';
import { InMemorySalesRepository } from '../../database/repositories/in-memory/in-memory-sales-repository';
import type {
  CategoriesRepository,
  ProductsRepository,
  SalesRepository,
} from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from '../products/create';
import type { IProductsDto } from '../products/dtos/products-dto';
import { CreateSalesUseCase } from './create';

let salesRepo: SalesRepository;
let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let sut: CreateSalesUseCase;
let productData: IProductsDto;
let category: Pick<Category, 'id' | 'name'> | null;
const categoryName = 'Category Name';

describe('Create Sales', () => {
  beforeEach(async () => {
    salesRepo = new InMemorySalesRepository();
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    sut = new CreateSalesUseCase(salesRepo, productsRepo);

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

    await createProductsUseCase.execute(productData);
  });

  it('should be able create sales', async () => {
    const product = await productsRepo.findByName(productData.name);

    expect(
      await sut.execute({
        saleDate: new Date(),
        items: [
          {
            productId: product!.id,
            quantity: 1,
            unitPrice: 5,
          },
        ],
      }),
    ).toBeUndefined();
  });
});
