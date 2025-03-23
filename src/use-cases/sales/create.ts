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
    data.items.forEach(async (items) => {
      const product = await this.productsRepo.findById(items.productId);
      if (!product) {
        throw new NotFoundError('Product not found');
      }
    });

    await this.salesRepo.create(data);
  }
}
