import type {
  ProductsRepository,
  TProduct,
} from '../../database/repositories/interfaces';
import type { TOrdenation } from './interfaces/ordenation-types';

export class FindAllProductsUseCase {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async execute(ordernation?: TOrdenation): Promise<TProduct[] | null> {
    return await this.productsRepo.findAll(ordernation);
  }
}
