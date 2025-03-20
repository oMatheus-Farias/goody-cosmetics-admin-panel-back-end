import type {
  ProductsRepository,
  TProduct,
} from '../../database/repositories/interfaces';

export class FindAllProductsUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(): Promise<TProduct[] | null> {
    return await this.productsRepo.findAll();
  }
}
