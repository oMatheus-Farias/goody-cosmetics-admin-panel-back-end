import type { PasswordCompare } from '../../adapters/interfaces/password-compare';
import { EXP_TIME_IN_HOURS } from '../../constants/exp-time-in-hours';
import type {
  RefreshTokensRepository,
  UsersRepository,
} from '../../database/repositories/interfaces';
import { CredentialsError } from '../../errors';
import type { AuthUsersDto } from './dtos/auth-users-dto';
import type { UserData } from './interfaces/user-data';

export class AuthUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly refreshTokensRepo: RefreshTokensRepository,
    private readonly passwordCompare: PasswordCompare,
  ) {}

  async execute(data: AuthUsersDto): Promise<UserData> {
    const user = await this.usersRepo.findByEmail(data.email);

    if (!user) {
      throw new CredentialsError();
    }

    const thePasswordsMatch = await this.passwordCompare.compare(
      data.password,
      user.passwordHash,
    );

    if (!thePasswordsMatch) {
      throw new CredentialsError();
    }

    const refreshTokens = await this.refreshTokensRepo.findAllByUserId(user.id);
    const refreshTokensExists = refreshTokens.length > 0;

    if (refreshTokensExists) {
      await this.refreshTokensRepo.deleteAll(user.id);
    }

    const expiresAtRefreshToken = new Date();

    expiresAtRefreshToken.setHours(
      expiresAtRefreshToken.getHours() + EXP_TIME_IN_HOURS,
    );

    const { id: refreshToken } = await this.refreshTokensRepo.create({
      user: { connect: { id: user.id } },
      expiresAt: expiresAtRefreshToken,
    });

    const userData: UserData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      refreshToken,
    };

    return userData;
  }
}
