import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { DeleteSalesUseCase } from '../../sales/delete';

export function makeDeleteSalesUseCase(): DeleteSalesUseCase {
  const salesRepo = new PrismaSalesRepository();
  return new DeleteSalesUseCase(salesRepo);
}
