import { randomBytes } from 'node:crypto';

import type { Prisma, Product, ProductImage } from '@prisma/client';

import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';
import type { IProductsImages } from '../../../use-cases/products/interfaces/products-images';
import type {
  ProductsRepository,
  TFindAllWithParams,
  TProduct,
} from '../interfaces';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: TProduct[] = [];

  async findById(productId: string): Promise<TProduct | null> {
    const product = this.items.find((product) => product.id === productId);
    return product || null;
  }
  async findByName(productName: string): Promise<Pick<Product, 'id'> | null> {
    const product = this.items.find((product) => product.name === productName);
    return product || null;
  }
  async findAll(ordernation?: TOrdenation): Promise<TProduct[] | null> {
    let products = this.items;

    if (ordernation && ordernation === 'LOWER_PRICE') {
      return (products = this.items.sort(
        (a, b) => a.currentPrice - b.currentPrice,
      ));
    }
    if (ordernation && ordernation === 'HIGHER_PRICE') {
      return (products = this.items.sort(
        (a, b) => b.currentPrice - a.currentPrice,
      ));
    }

    return products as unknown as Promise<TProduct[] | null>;
  }
  async findAllByCategory(
    categoryId: string,
    ordernation?: TOrdenation,
  ): Promise<TProduct[] | null> {
    let products = this.items.filter(
      (product) => product.categories.id === categoryId,
    );

    if (ordernation && ordernation === 'LOWER_PRICE') {
      return (products = products.sort(
        (a, b) => a.currentPrice - b.currentPrice,
      ));
    }
    if (ordernation && ordernation === 'HIGHER_PRICE') {
      return (products = products.sort(
        (a, b) => b.currentPrice - a.currentPrice,
      ));
    }

    return products as unknown as Promise<TProduct[] | null>;
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
  async create(data: Prisma.ProductCreateInput): Promise<Pick<Product, 'id'>> {
    const product = {
      id: randomBytes(16).toString('hex'),
      name: data.name as string,
      description: data.description as string,
      currentPrice: data.currentPrice as number,
      oldPrice: data.oldPrice as number,
      stockQuantity: data.stockQuantity as number,
      createdAt: new Date(),
      categories: {
        id: data.categories.connect?.id as string,
        name: 'Category',
      },
      productImage: [
        {
          id: randomBytes(16).toString('hex'),
          url: 'http://example.com/image.jpg',
        },
      ],
    };
    this.items.push(product);
    return { id: product.id };
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
  async findImagesById(
    imageId: string,
  ): Promise<Pick<ProductImage, 'id'> | null> {
    const product = this.items.find((product) =>
      product.productImage.find((image) => image.id === imageId),
    );
    if (!product) {
      return null;
    }

    const image = product.productImage.find((image) => image.id === imageId);
    return image || null;
  }
  async createImages(productId: string, data: IProductsImages): Promise<void> {
    const product = this.items.find((product) => product.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    data.imageUrls.forEach((imageUrl) => {
      product.productImage.push({
        id: randomBytes(16).toString('hex'),
        url: imageUrl,
      });
    });
  }
  async updateImages(imageId: string, imageUrl: string): Promise<void> {
    const product = this.items.find((product) =>
      product.productImage.find((image) => image.id === imageId),
    );
    if (!product) {
      throw new Error('Product not found');
    }

    product.productImage.forEach((image) => {
      if (image.id === imageId) {
        image.url = imageUrl;
      }
    });
  }
  async deleteImages(productId: string): Promise<void> {
    const product = this.items.find((product) => product.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.productImage = [];
  }
}
