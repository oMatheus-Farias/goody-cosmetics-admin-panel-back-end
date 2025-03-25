import type { Category } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  InMemoryCategoriesRepository,
  InMemoryProductsRepository,
} from '../../database/repositories/in-memory';
import { InMemorySalesRepository } from '../../database/repositories/in-memory/in-memory-sales-repository';
import {
  CategoriesRepository,
  ProductsRepository,
  SalesRepository,
} from '../../database/repositories/interfaces';
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from '../products/create';
import type { IProductsDto } from '../products/dtos/products-dto';
import { CreateSalesUseCase } from './create';
import { FindAllSalesWithParamsUseCase } from './find-all-with-params';

let salesRepo: SalesRepository;
let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let createSalesUseCase: CreateSalesUseCase;
let sut: FindAllSalesWithParamsUseCase;
let productData: IProductsDto;
let category: Pick<Category, 'id' | 'name'> | null;
const categoryName = 'Category Name';

describe('Find All Sales With Params', () => {
  beforeEach(async () => {
    salesRepo = new InMemorySalesRepository();
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    createProductsUseCase = new CreateProductsUseCase(
      productsRepo,
      categoriesRepo,
    );
    createSalesUseCase = new CreateSalesUseCase(salesRepo, productsRepo);
    sut = new FindAllSalesWithParamsUseCase(salesRepo);

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
    const product = await productsRepo.findByName(productData.name);
    await createSalesUseCase.execute({
      saleDate: new Date(),
      items: [
        {
          productId: product!.id,
          quantity: 1,
          unitPrice: 5,
        },
      ],
    });
  });

  it('should find all sales with page index params', async () => {
    const sales = await sut.execute(0);
    expect(sales.sales).toHaveLength(1);
  });
});
