import type {
  CategoriesRepository,
  ProductsRepository,
} from '../../database/repositories/interfaces';
import { AlreadyExistsError, NotFoundError } from '../../errors';
import type { IProductsDto } from './dtos/products-dto';

export class UpdateProductsUseCase {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly categoriesRepo: CategoriesRepository,
  ) {}

  async execute(
    productId: string,
    data: Partial<Omit<IProductsDto, 'imageUrls'>>,
  ): Promise<void> {
    const product = await this.productsRepo.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (data.categoryId) {
      const category = await this.categoriesRepo.findById(data.categoryId);

      if (!category) {
        throw new NotFoundError('Category not found');
      }
    }

    if (data.name) {
      const productWithSameName = await this.productsRepo.findByName(
        data.name as string,
      );

      if (productWithSameName && productWithSameName.id !== productId) {
        throw new AlreadyExistsError('Product with same name already exists');
      }
    }

    await this.productsRepo.update(productId, data);
  }
}
