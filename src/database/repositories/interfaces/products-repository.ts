import type { Prisma, Product, ProductImage } from '@prisma/client';

import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';
import type { IProductsImages } from '../../../use-cases/products/interfaces/products-images';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  currentPrice: number;
  oldPrice: number;
  stockQuantity: number;
  createdAt: Date;
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
  update(productId: string, data: Prisma.ProductUpdateInput): Promise<void>;
  delete(productId: string): Promise<void>;
  findImagesById(imageId: string): Promise<Pick<ProductImage, 'id'> | null>;
  createImages(productId: string, data: IProductsImages): Promise<void>;
  updateImages(imageId: string, imageUrl: string): Promise<void>;
  deleteImages(productId: string): Promise<void>;
}
