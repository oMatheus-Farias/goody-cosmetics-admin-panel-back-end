import {
  ProductsRepository,
  SalesRepository,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import { ICreateSalesDto } from './dtos';

export class CreateSalesUseCase {
  constructor(
    private readonly salesRepo: SalesRepository,
    private readonly productsRepo: ProductsRepository,
  ) {}

  async execute(data: ICreateSalesDto): Promise<void> {
    for (let i = 0; i < data.items.length; i++) {
      const product = await this.productsRepo.findById(data.items[i].productId);
      if (!product) {
        throw new NotFoundError('Product not found');
      }
    }

    await this.salesRepo.create(data);
  }
}
