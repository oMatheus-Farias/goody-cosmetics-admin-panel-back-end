import {
  PrismaRefreshTokensRepository,
  PrismaUsersRepository,
} from '../../../database/repositories/prisma';
import { SignOutUsersUseCase } from '../../sessions/sign-out-users';

export function makeSignOutUsersUseCase(): SignOutUsersUseCase {
  const usersRepo = new PrismaUsersRepository();
  const refreshTokensRepo = new PrismaRefreshTokensRepository();
  return new SignOutUsersUseCase(usersRepo, refreshTokensRepo);
}
