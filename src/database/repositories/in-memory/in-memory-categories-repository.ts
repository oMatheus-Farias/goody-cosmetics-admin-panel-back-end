import type { Category, Prisma } from '@prisma/client';

import { CategoriesRepository } from '../interfaces';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = [];

  async findById(
    categoryId: string,
  ): Promise<Pick<Category, 'id' | 'name'> | null> {
    const category = this.items.find((category) => category.id === categoryId);
    return category || null;
  }
  async findByName(
    categoryName: string,
  ): Promise<Pick<Category, 'id' | 'name'> | null> {
    const category = this.items.find(
      (category) => category.name === categoryName,
    );
    return category || null;
  }
  async findAll(): Promise<Category[] | null> {
    return this.items || null;
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
    const categories = searchTerm
      ? this.items.filter((category) => category.name.includes(searchTerm))
      : this.items;
    const count = categories.length;
    const totalCount = this.items.length;
    return {
      categories,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount: totalCount,
      },
    };
  }
  async create(data: Prisma.CategoryCreateInput): Promise<void> {
    this.items.push(data as Category);
  }
  async update(
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<void> {
    const category = this.items.find((category) => category.id === categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    if (data.name) {
      category.name = data.name as string;
    }
    if (data.emoji) {
      category.emoji = data.emoji as string;
    }
  }
  async delete(categoryId: string): Promise<void> {
    const categoryIndex = this.items.findIndex(
      (category) => category.id === categoryId,
    );
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    this.items.splice(categoryIndex, 1);
  }
}
