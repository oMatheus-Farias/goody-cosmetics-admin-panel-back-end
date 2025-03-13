import type { Prisma, RefreshToken } from '@prisma/client';

import { RefreshTokensRepository } from '../interfaces';

export class InMemoryRefreshTokensRepository
  implements RefreshTokensRepository
{
  public items: RefreshToken[] = [];

  async findById(
    refreshTokenId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'> | null> {
    const refreshToken = this.items.find(
      (refreshToken) => refreshToken.id === refreshTokenId,
    );

    if (!refreshToken) {
      return null;
    }

    const refreshTokenData = {
      id: refreshToken.id,
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
    };

    return refreshTokenData;
  }
  async findAllByUserId(
    userId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'>[] | []> {
    const refreshTokens = this.items.filter(
      (refreshToken) => refreshToken.userId === userId,
    );

    if (!refreshTokens.length) {
      return [];
    }

    const refreshTokensData = refreshTokens.map((refreshToken) => ({
      id: refreshToken.id,
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
    }));

    return refreshTokensData;
  }
  async create(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<Pick<RefreshToken, 'id'>> {
    const refreshToken: RefreshToken = {
      id: crypto.randomUUID(),
      userId: data.user.connect?.id as string,
      expiresAt: data.expiresAt as Date,
      createdAt: new Date(),
    };

    this.items.push(refreshToken);
    return { id: refreshToken.id };
  }
  async deleteAll(userId: string): Promise<void> {
    this.items = this.items.filter(
      (refreshToken) => refreshToken.userId !== userId,
    );
  }
}
