import { PasswordCompareAdapter } from '../../../adapters/password-compare-adapter';
import {
  PrismaRefreshTokensRepository,
  PrismaUsersRepository,
} from '../../../database/repositories/prisma';
import { AuthUsersUseCase } from '../../sessions/auth-users';

export function makeAuthUsersUseCase(): AuthUsersUseCase {
  const usersRepo = new PrismaUsersRepository();
  const refreshTokensRepo = new PrismaRefreshTokensRepository();
  const passwordCompare = new PasswordCompareAdapter();

  return new AuthUsersUseCase(usersRepo, refreshTokensRepo, passwordCompare);
}
