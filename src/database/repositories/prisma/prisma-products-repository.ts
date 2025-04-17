import type { Prisma, Product, ProductImage } from '@prisma/client';

import { prisma } from '../../../app';
import type { TOrdenation } from '../../../use-cases/products/interfaces/ordenation-types';
import type { IProductsImages } from '../../../use-cases/products/interfaces/products-images';
import type {
  ProductsRepository,
  TFindAllWithParams,
  TProduct,
} from '../interfaces';

export class PrismaProductsRepository implements ProductsRepository {
  async findById(productId: string): Promise<TProduct | null> {
    return await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        currentPrice: true,
        oldPrice: true,
        stockQuantity: true,
        createdAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }
  async findByName(productName: string): Promise<Pick<Product, 'id'> | null> {
    return await prisma.product.findUnique({
      where: { name: productName },
      select: { id: true },
    });
  }
  async findAll(ordernation?: TOrdenation): Promise<TProduct[] | null> {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        currentPrice: true,
        oldPrice: true,
        stockQuantity: true,
        createdAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: ordernation
        ? ordernation === 'A-Z' || ordernation === 'Z-A'
          ? { name: ordernation === 'A-Z' ? 'asc' : 'desc' }
          : { currentPrice: ordernation === 'LOWER_PRICE' ? 'asc' : 'desc' }
        : { name: 'asc' },
    });
  }
  async findAllByCategory(
    categoryId: string,
    ordernation?: TOrdenation,
  ): Promise<TProduct[] | null> {
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
        createdAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: ordernation
        ? ordernation === 'A-Z' || ordernation === 'Z-A'
          ? { name: ordernation === 'A-Z' ? 'asc' : 'desc' }
          : { currentPrice: ordernation === 'LOWER_PRICE' ? 'asc' : 'desc' }
        : { name: 'asc' },
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
        createdAt: true,
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        productImage: {
          select: {
            id: true,
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
  async findImagesById(
    imageId: string,
  ): Promise<Pick<ProductImage, 'id'> | null> {
    return await prisma.productImage.findUnique({
      where: { id: imageId },
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
  async updateImages(imageId: string, imageUrl: string): Promise<void> {
    await prisma.productImage.updateMany({
      where: { id: imageId },
      data: {
        url: imageUrl,
      },
    });
  }
  async deleteImages(productId: string): Promise<void> {
    await prisma.productImage.deleteMany({
      where: { productId },
    });
  }
}
