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
    this.items.push(data as unknown as RefreshToken);
    const refreshToken = this.items[this.items.length - 1];
    return { id: refreshToken.id };
  }
  async deleteAll(userId: string): Promise<void> {
    this.items = this.items.filter(
      (refreshToken) => refreshToken.userId !== userId,
    );
  }
}
