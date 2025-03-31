import type { Prisma, User } from '@prisma/client';

import type { ICreateUsersDto } from '../../../use-cases/users/dtos/create-users-dto';

export type TFindAllWithParams = {
  users:
    | Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>[]
    | null;
  meta: {
    pageIndex: number;
    limit: number;
    countPerPage: number;
    totalCount: number;
  };
};

export interface UsersRepository {
  findById(
    userId: string,
  ): Promise<Pick<User, 'id' | 'firstName' | 'lastName' | 'role'> | null>;
  findByIdWithReturnedPassword(
    userId: string,
  ): Promise<Pick<User, 'id' | 'passwordHash'> | null>;
  findByNames(
    firstName: string,
    lastName: string,
  ): Promise<Pick<User, 'id' | 'email'> | null>;
  findByEmail(email: string): Promise<User | null>;
  findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams>;
  create(data: ICreateUsersDto): Promise<void>;
  update(userId: string, data: Prisma.UserUpdateInput): Promise<void>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
  forgotPassword(
    userId: string,
    resetToken: string,
    resetTokenExpiresAt: Date,
  ): Promise<void>;
  resetPassword(userId: string, newPassword: string): Promise<void>;
  setNullResetToken(userId: string): Promise<void>;
  delete(userId: string): Promise<void>;
}
