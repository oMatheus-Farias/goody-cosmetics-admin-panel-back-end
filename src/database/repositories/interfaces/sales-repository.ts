import type { Sale, SaleItem } from '@prisma/client';

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
  findByProductId(productId: string): Promise<{ id: string } | null>;
  findSalesItemsById(saleItemId: string): Promise<SaleItem | null>;
  findSaleItemsBySaleId(saleId: string): Promise<SaleItem[] | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: ICreateSalesDto): Promise<Pick<Sale, 'id'>>;
  update(data: IUpdateSalesDto): Promise<void>;
  deleteSaleItems(saleItemId: string): Promise<void>;
  deleteSales(saleId: string): Promise<void>;
}
