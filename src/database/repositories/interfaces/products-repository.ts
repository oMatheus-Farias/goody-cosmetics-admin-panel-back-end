import type { Prisma, Product } from '@prisma/client';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  stockQuantity: number;
  categories: {
    id: string;
    name: string;
  };
  productImage: {
    url: string;
  }[];
};

export type TFindAllWithParams = {
  products: TProduct[] | null;
  meta: {
    pageIndex: number;
    limit: number;
    countPerPage: number;
    totalCount: number;
  };
};

export interface ProductsRepository {
  findById(productId: string): Promise<Pick<Product, 'id'> | null>;
  findByName(productName: string): Promise<Pick<Product, 'id'> | null>;
  findAll(): Promise<TProduct[] | null>;
  findAllByCategory(categoryId: string): Promise<TProduct[] | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: Prisma.ProductCreateInput): Promise<void>;
  update(productId: string, data: Prisma.ProductUpdateInput): Promise<void>;
  delete(productId: string): Promise<void>;
}
