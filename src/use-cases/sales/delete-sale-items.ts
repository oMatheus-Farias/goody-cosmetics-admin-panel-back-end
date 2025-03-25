import type { SalesRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class DeleteSaleItemsUseCase {
  constructor(private readonly salesRepo: SalesRepository) {}

  async execute(saleItemId: string): Promise<void> {
    const saleItem = await this.salesRepo.findSalesItemsById(saleItemId);

    if (!saleItem) {
      throw new NotFoundError('Sale item not found');
    }

    await this.salesRepo.deleteSaleItems(saleItemId);
  }
}
