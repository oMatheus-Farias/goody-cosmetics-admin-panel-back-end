import type { Prisma, Product } from '@prisma/client';

import { prisma } from '../../../app';
import type { IProductsImages } from '../../../use-cases/products/interfaces/products-images';
import type {
  ProductsRepository,
  TFindAllWithParams,
  TProduct,
} from '../interfaces';

export class PrismaProductsRepository implements ProductsRepository {
  async findById(productId: string): Promise<Pick<Product, 'id'> | null> {
    return await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
  }
  async findByName(productName: string): Promise<Pick<Product, 'id'> | null> {
    return await prisma.product.findUnique({
      where: { name: productName },
      select: { id: true },
    });
  }
  async findAll(): Promise<TProduct[] | null> {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        currentPrice: true,
        oldPrice: true,
        stockQuantity: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            url: true,
          },
        },
      },
    });
  }
  async findAllByCategory(categoryId: string): Promise<TProduct[] | null> {
    return await prisma.product.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        currentPrice: true,
        oldPrice: true,
        stockQuantity: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            url: true,
          },
        },
      },
    });
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams> {
    const products = await prisma.product.findMany({
      skip: page * 10,
      take: 10,
      orderBy: { name: 'asc' },
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        currentPrice: true,
        oldPrice: true,
        stockQuantity: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            url: true,
          },
        },
      },
    });

    const count = await prisma.product.count({
      skip: page * 10,
      take: 10,
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });

    const totalCount = await prisma.product.count({
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });

    return {
      products,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount,
      },
    };
  }
  async create(data: Prisma.ProductCreateInput): Promise<Pick<Product, 'id'>> {
    return await prisma.product.create({
      data,
      select: { id: true },
    });
  }
  async createImages(productId: string, data: IProductsImages): Promise<void> {
    await prisma.productImage.createMany({
      data: data.imageUrls.map((imageUrl) => ({
        url: imageUrl,
        productId,
      })),
    });
  }
  async update(
    productId: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<void> {
    await prisma.product.update({
      where: { id: productId },
      data,
    });
  }
  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: { id: productId },
    });
  }
}
