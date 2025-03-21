import type {
  ProductsRepository,
  TFindAllWithParams,
} from '../../database/repositories/interfaces';

export class FindAllProductsWithParamsUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams | null> {
    return await this.productsRepo.findAllWithParams(page, searchTerm);
  }
}
