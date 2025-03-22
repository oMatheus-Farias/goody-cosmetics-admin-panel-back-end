export interface ICreateSalesDto {
  saleDate: Date;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
