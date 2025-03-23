import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { UpdateSalesUseCase } from '../../sales/update';

export function makeUpdateSalesUseCase(): UpdateSalesUseCase {
  const salesRepo = new PrismaSalesRepository();
  return new UpdateSalesUseCase(salesRepo);
}
