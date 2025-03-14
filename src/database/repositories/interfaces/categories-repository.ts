import type { Category, Prisma } from '@prisma/client';

export type TFindAllWithParams = {
  categories: Category[] | null;
  meta: {
    pageIndex: number;
    limit: number;
    countPerPage: number;
    totalCount: number;
  };
};

export interface CategoriesRepository {
  findById(categoryId: string): Promise<Pick<Category, 'id' | 'name'> | null>;
  findByName(
    categoryName: string,
  ): Promise<Pick<Category, 'id' | 'name'> | null>;
  findAll(): Promise<Pick<Category, 'id' | 'name'>[] | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: Prisma.CategoryCreateInput): Promise<void>;
  update(categoryId: string, data: Prisma.CategoryUpdateInput): Promise<void>;
  delete(categoryId: string): Promise<void>;
}
