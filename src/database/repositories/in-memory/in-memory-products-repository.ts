import type { Prisma, Product } from '@prisma/client';

import type {
  ProductsRepository,
  TFindAllWithParams,
  TProduct,
} from '../interfaces';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: TProduct[] = [];

  async findById(productId: string): Promise<Pick<Product, 'id'> | null> {
    const product = this.items.find((product) => product.id === productId);
    return product || null;
  }
  async findByName(productName: string): Promise<Pick<Product, 'id'> | null> {
    const product = this.items.find((product) => product.name === productName);
    return product || null;
  }
  async findAll(): Promise<TProduct[] | null> {
    const products = this.items;
    return products as unknown as Promise<TProduct[] | null>;
  }
  async findAllByCategory(categoryId: string): Promise<TProduct[] | null> {
    const products = this.items.filter((product) =>
      product.categories.id.includes(categoryId),
    );
    return products;
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams> {
    const products = searchTerm
      ? this.items.filter((product) => product.name.includes(searchTerm))
      : this.items;
    const count = products.length;
    const totalCount = this.items.length;
    return {
      products,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount: totalCount,
      },
    };
  }
  async create(data: Prisma.ProductCreateInput): Promise<void> {
    this.items.push(data as TProduct);
  }
  async update(
    productId: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<void> {
    const product = this.items.find((product) => product.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (data.name) {
      product.name = data.name as string;
    }
    if (data.description) {
      product.description = data.description as string;
    }
    if (data.currentPrice) {
      product.currentPrice = data.currentPrice as number;
    }
    if (data.oldPrice) {
      product.oldPrice = data.oldPrice as number;
    }
    if (data.stockQuantity) {
      product.stockQuantity = data.stockQuantity as number;
    }
  }
  async delete(productId: string): Promise<void> {
    const index = this.items.findIndex((product) => product.id === productId);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.items.splice(index, 1);
  }
}
