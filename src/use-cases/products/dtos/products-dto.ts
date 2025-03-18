export interface IProductsDto {
  name: string;
  description: string;
  categoryId: string;
  oldPrice: number;
  currentPrice: number;
  stockQuantity: number;
  imageUrls: string[];
}
