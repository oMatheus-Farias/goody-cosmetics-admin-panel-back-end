import type { Category } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  InMemoryCategoriesRepository,
  InMemoryProductsRepository,
  InMemorySalesRepository,
} from '../../database/repositories/in-memory';
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
import { DeleteSaleItemsUseCase } from './delete-sale-items';
import type { ISalesData } from './interfaces/return-sales-data';

let salesRepo: SalesRepository;
let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let createProductsUseCase: CreateProductsUseCase;
let createSalesUseCase: CreateSalesUseCase;
let sut: DeleteSaleItemsUseCase;
let productData: IProductsDto;
let category: Pick<Category, 'id' | 'name'> | null;
let sale: Pick<ISalesData, 'id'> | null;
const categoryName = 'Category Name';

describe('Delete Sale Items', () => {
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
    sut = new DeleteSaleItemsUseCase(salesRepo);

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

  it('should delete a sale item', async () => {
    const saleItems = await salesRepo.findSaleItemsBySaleId(sale!.id);
    const saleItem = saleItems?.[0];

    await sut.execute(saleItem!.id);
    const deletedSaleItem = await salesRepo.findSalesItemsById(saleItem!.id);

    expect(deletedSaleItem).toBeNull();
  });

  it('should throw an error if the sale item does not exist', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
