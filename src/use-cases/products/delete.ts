import type {
  ProductsRepository,
  SalesRepository,
} from '../../database/repositories/interfaces';
import { ConflictError, NotFoundError } from '../../errors';

export class DeleteProductsUseCase {
  constructor(
    private readonly productsRepo: ProductsRepository,
    private readonly salesRepo: SalesRepository,
  ) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productsRepo.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const sales = await this.salesRepo.findByProductId(productId);

    if (sales) {
      throw new ConflictError(
        'Product has associated sales and cannot be deleted',
      );
    }

    await Promise.all([
      this.productsRepo.deleteImages(product.id),
      this.productsRepo.delete(product.id),
    ]);
  }
}
