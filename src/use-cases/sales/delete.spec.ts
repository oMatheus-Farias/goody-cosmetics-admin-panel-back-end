import type { Category } from '@prisma/client';
import fs from 'fs';
import path from 'path';
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
import { NotFoundError } from '../../errors';
import { CreateCategoriesUseCase } from '../categories/create';
import { CreateProductsUseCase } from '../products/create';
import type { IProductsDto } from '../products/dtos/products-dto';
import { CreateSalesUseCase } from './create';
import { DeleteSalesUseCase } from './delete';
import type { ISalesData } from './interfaces/return-sales-data';

let salesRepo: SalesRepository;
let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let createSalesUseCase: CreateSalesUseCase;
let sut: DeleteSalesUseCase;
let productData: IProductsDto;
let category: Pick<Category, 'id' | 'name'> | null;
let sale: Pick<ISalesData, 'id'> | null;
const categoryName = 'Category Name';

describe('Delete Sales', () => {
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
    sut = new DeleteSalesUseCase(salesRepo);

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
    sale = await createSalesUseCase.execute({
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

  it('should delete a sale', async () => {
    await sut.execute(sale!.id);

    const sales = await salesRepo.findById(sale!.id);

    expect(sales).toBeNull();
  });

  it('should throw an error if sale not found', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
