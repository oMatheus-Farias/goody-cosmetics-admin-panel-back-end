import type {
  SalesRepository,
  SalesTFindAllWithParams,
} from '../../database/repositories/interfaces';

export class FindAllSalesWithParamsUseCase {
  constructor(private readonly salesRepo: SalesRepository) {}

  async execute(
    page: number,
    searchTerm?: string,
  ): Promise<SalesTFindAllWithParams> {
    return this.salesRepo.findAllWithParams(page, searchTerm);
  }
}
