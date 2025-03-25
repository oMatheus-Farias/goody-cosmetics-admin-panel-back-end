import type { SalesRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class DeleteSalesUseCase {
  constructor(private readonly salesRepo: SalesRepository) {}

  async execute(saleId: string): Promise<void> {
    const sale = await this.salesRepo.findById(saleId);

    if (!sale) {
      throw new NotFoundError('Sale not found');
    }

    await this.salesRepo.deleteSales(saleId);
  }
}
