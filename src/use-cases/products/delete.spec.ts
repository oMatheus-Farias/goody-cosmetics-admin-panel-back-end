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
import { CreateCategoriesUseCase } from '../categories/create';
import { DeleteProductsUseCase } from './delete';
import type { IProductsDto } from './dtos/products-dto';

let productsRepo: ProductsRepository;
let categoriesRepo: CategoriesRepository;
let categoriesUseCase: CreateCategoriesUseCase;
let sut: DeleteProductsUseCase;
let category: Pick<Category, 'id' | 'name'> | null;
let productData: IProductsDto;
const categoryName = 'Category Name';

describe('Delete Products', () => {
  beforeEach(async () => {
    productsRepo = new InMemoryProductsRepository();
    categoriesRepo = new InMemoryCategoriesRepository();
    categoriesUseCase = new CreateCategoriesUseCase(categoriesRepo);
    sut = new DeleteProductsUseCase(productsRepo);

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
});
