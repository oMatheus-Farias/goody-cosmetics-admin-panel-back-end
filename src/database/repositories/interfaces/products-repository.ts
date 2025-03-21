import type { Prisma, Product } from '@prisma/client';

import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';
import type { IProductsImages } from '../../../use-cases/products/interfaces/products-images';

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
    id: string;
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
  findById(productId: string): Promise<TProduct | null>;
  findByName(productName: string): Promise<Pick<Product, 'id'> | null>;
  findAll(ordernation?: TOrdenation): Promise<TProduct[] | null>;
  findAllByCategory(
    categoryId: string,
    ordernation?: TOrdenation,
  ): Promise<TProduct[] | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: Prisma.ProductCreateInput): Promise<Pick<Product, 'id'>>;
  createImages(productId: string, data: IProductsImages): Promise<void>;
  update(productId: string, data: Prisma.ProductUpdateInput): Promise<void>;
  updateImages(
    imageId: string,
    productId: string,
    data: IProductsImages,
  ): Promise<void>;
  delete(productId: string): Promise<void>;
}
