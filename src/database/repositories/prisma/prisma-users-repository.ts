import type { Prisma, User } from '@prisma/client';

import { prisma } from '../../../app';
import type { ICreateUsersDto } from '../../../use-cases/users/dtos/create-users-dto';
import type {
  TFindAllWithParams,
  UsersRepository,
} from '../interfaces/users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async findById(
    userId: string,
  ): Promise<Pick<User, 'id' | 'firstName' | 'lastName' | 'role'> | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }
  async findByIdWithReturnedPassword(
    userId: string,
  ): Promise<Pick<User, 'id' | 'passwordHash'> | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
  }
  async findByNames(
    firstName: string,
    lastName: string,
  ): Promise<Pick<User, 'id' | 'email'> | null> {
    return await prisma.user.findFirst({
      where: {
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findByResetToken(resetToken: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        resetToken,
      },
    });
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams> {
    const users = await prisma.user.findMany({
      skip: page * 10,
      take: 10,
      orderBy: { firstName: 'asc' },
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    const count = await prisma.user.count({
      skip: page * 10,
      take: 10,
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
            },
          },
          {
            lastName: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    const totalCount = await prisma.user.count({
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
            },
          },
          {
            lastName: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    return {
      users,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount,
      },
    };
  }
  async create(data: ICreateUsersDto): Promise<void> {
    await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: data.password,
        role: data?.role,
      },
    });
  }
  async update(userId: string, data: Prisma.UserUpdateInput): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: newPassword,
      },
    });
  }
  async forgotPassword(
    userId: string,
    resetToken: string,
    resetTokenExpiresAt: Date,
  ): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resetToken,
        resetTokenExpiresAt,
      },
    });
  }
  async resetPassword(userId: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: newPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }
  async setNullResetToken(userId: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }
  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
