import type {
  ProductsRepository,
  TProduct,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class FindProductsByIdUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(productId: string): Promise<TProduct | null> {
    const product = await this.productsRepo.findById(productId);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }
}
