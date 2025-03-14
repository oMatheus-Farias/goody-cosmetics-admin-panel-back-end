import type { Category, Prisma } from '@prisma/client';

import { prisma } from '../../../app';
import { CategoriesRepository } from '../interfaces';

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findById(
    categoryId: string,
  ): Promise<Pick<Category, 'id' | 'name'> | null> {
    return await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true },
    });
  }
  async findByName(
    categoryName: string,
  ): Promise<Pick<Category, 'id' | 'name'> | null> {
    return await prisma.category.findUnique({
      where: { name: categoryName },
      select: { id: true, name: true },
    });
  }
  async findAll(): Promise<Pick<Category, 'id' | 'name'>[] | null> {
    return await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<{
    categories: Category[] | null;
    meta: {
      pageIndex: number;
      limit: number;
      countPerPage: number;
      totalCount: number;
    };
  }> {
    const categories = await prisma.category.findMany({
      skip: page * 10,
      take: 10,
      orderBy: { name: 'asc' },
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    });

    const count = await prisma.category.count({
      skip: page * 10,
      take: 10,
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });

    const totalCount = await prisma.category.count({
      where: {
        name: {
          contains: searchTerm,
        },
      },
    });

    return {
      categories,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount,
      },
    };
  }
  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    await prisma.category.create({ data });
  }
  async update(
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<void> {
    await prisma.category.update({ where: { id: categoryId }, data });
  }
  async delete(categoryId: string): Promise<void> {
    await prisma.category.delete({ where: { id: categoryId } });
  }
}
