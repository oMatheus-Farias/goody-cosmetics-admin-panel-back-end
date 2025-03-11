import { EXP_TIME_IN_HOURS } from '../../constants/exp-time-in-hours';
import type {
  RefreshTokensRepository,
  UsersRepository,
} from '../../database/repositories/interfaces';
import { CredentialsError, NotFoundError } from '../../errors';
import type { IReturnUseCaseData } from './interfaces/return-use-case-data';

export class CreateRefreshTokensUseCase {
  constructor(
    private readonly refreshTokensRepo: RefreshTokensRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async execute(refreshTokenId: string): Promise<IReturnUseCaseData> {
    const refreshTokens = await this.refreshTokensRepo.findById(refreshTokenId);

    if (!refreshTokens) {
      throw new NotFoundError('Refresh token not found');
    }

    if (Date.now() > refreshTokens.expiresAt.getTime()) {
      await this.refreshTokensRepo.deleteAll(refreshTokens.userId);
      throw new CredentialsError('Refresh token expired.');
    }
    await this.refreshTokensRepo.deleteAll(refreshTokens.userId);

    const user = await this.usersRepo.findById(refreshTokens.userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const expiresAtRefreshToken = new Date();

    expiresAtRefreshToken.setHours(
      expiresAtRefreshToken.getHours() + EXP_TIME_IN_HOURS,
    );

    const { id: refreshToken } = await this.refreshTokensRepo.create({
      user: { connect: { id: user.id } },
      expiresAt: expiresAtRefreshToken,
    });

    return {
      refreshToken,
      user,
    };
  }
}
