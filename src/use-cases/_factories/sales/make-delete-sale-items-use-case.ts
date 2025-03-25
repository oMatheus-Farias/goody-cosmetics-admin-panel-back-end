import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { DeleteSaleItemsUseCase } from '../../sales/delete-sale-items';

export function makeDeleteSaleItemsUseCase(): DeleteSaleItemsUseCase {
  const salesRepo = new PrismaSalesRepository();
  return new DeleteSaleItemsUseCase(salesRepo);
}
