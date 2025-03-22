export interface IUpdateSalesDto {
  saleId: string;
  saleDate?: Date;
  items?: {
    saleItemId: string;
    quantity?: number;
    unitPrice?: number;
  }[];
}
