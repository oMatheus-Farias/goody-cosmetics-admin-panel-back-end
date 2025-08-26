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
import { DeleteProductsUseCase } from './delete';
import type { IProductsDto } from './dtos/products-dto';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let salesRepo: SalesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: DeleteProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Delete Products', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    salesRepo = new InMemorySalesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new DeleteProductsUseCase(productsRepo, salesRepo);

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

    await productsRepo.create({
      ...productData,
      categories: {
        connect: { id: productData.categoryId },
      },
    });
  });

  it('should delete a product', async () => {
    const product = await productsRepo.findByName(productData.name);

    await sut.execute(product!.id);
    const productDeleted = await productsRepo.findByName(productData.name);

    expect(productDeleted).toBeNull();
  });

  it('should throw error if product not exists', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
