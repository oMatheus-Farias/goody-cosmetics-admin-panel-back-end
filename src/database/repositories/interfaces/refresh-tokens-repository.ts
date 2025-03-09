import type { Prisma, RefreshToken } from '@prisma/client';

export interface RefreshTokensRepository {
  findById(
    refreshTokenId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'> | null>;
  findAllByUserId(
    userId: string,
  ): Promise<Pick<RefreshToken, 'id' | 'userId' | 'expiresAt'>[] | []>;
  create(
    data: Prisma.RefreshTokenCreateInput,
  ): Promise<Pick<RefreshToken, 'id'>>;
  deleteAll(userId: string): Promise<void>;
}
