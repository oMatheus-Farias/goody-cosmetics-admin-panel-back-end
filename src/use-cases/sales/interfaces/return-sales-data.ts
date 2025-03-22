export interface ISalesData {
  id: string;
  saleDate: Date;
  totalPrice: number;
  items: {
    saleItemId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}
