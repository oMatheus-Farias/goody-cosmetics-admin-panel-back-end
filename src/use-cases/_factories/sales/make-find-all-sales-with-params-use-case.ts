import { PrismaSalesRepository } from '../../../database/repositories/prisma/prisma-sales-repository';
import { FindAllSalesWithParamsUseCase } from '../../sales/find-all-with-params';

export function makeFindAllSalesWithParamsUseCase(): FindAllSalesWithParamsUseCase {
  const salesRepo = new PrismaSalesRepository();
  return new FindAllSalesWithParamsUseCase(salesRepo);
}
