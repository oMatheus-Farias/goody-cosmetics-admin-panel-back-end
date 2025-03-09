import type { Prisma, RefreshToken } from '@prisma/client';

import { prisma } from '../../../app';
import { RefreshTokensRepository } from '../interfaces';

export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  async findById(
    refreshTokenId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'> | null> {
    return await prisma.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
      },
    });
  }
  async findAllByUserId(
    userId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'>[] | []> {
    return await prisma.refreshToken.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
      },
    });
  }
  async create(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<Pick<RefreshToken, 'id'>> {
    const { id } = await prisma.refreshToken.create({
      data,
      select: {
        id: true,
      },
    });
    return { id };
  }
  async deleteAll(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
