import { SalesRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import type { IUpdateSalesDto } from './dtos';

export class UpdateSalesUseCase {
  constructor(private readonly salesRepo: SalesRepository) {}

  async execute(data: IUpdateSalesDto): Promise<void> {
    const sale = await this.salesRepo.findById(data.saleId);

    if (!sale) {
      throw new NotFoundError('Sale not found');
    }

    if (data.items && data.items?.length > 0) {
      for (let i = 0; i < data.items.length; i++) {
        const saleItem = await this.salesRepo.findSalesItemsById(
          data.items[i].saleItemId,
        );
        if (!saleItem) {
          throw new NotFoundError('Sale Item not found');
        }
      }
    }

    await this.salesRepo.update(data);
  }
}
