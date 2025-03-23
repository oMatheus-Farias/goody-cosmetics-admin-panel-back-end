import type {
  ICreateSalesDto,
  IUpdateSalesDto,
} from '../../../use-cases/sales/dtos';
import type { ISalesData } from '../../../use-cases/sales/interfaces/return-sales-data';

export type TFindAllWithParams = {
  sales: ISalesData[] | null;
  meta: {
    pageIndex: number;
    limit: number;
    countPerPage: number;
    totalCount: number;
  };
};

export interface SalesRepository {
  findById(saleId: string): Promise<ISalesData | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: ICreateSalesDto): Promise<void>;
  update(data: IUpdateSalesDto): Promise<void>;
  deleteSaleItems(saleItemId: string): Promise<void>;
  deleteSales(saleId: string): Promise<void>;
}
