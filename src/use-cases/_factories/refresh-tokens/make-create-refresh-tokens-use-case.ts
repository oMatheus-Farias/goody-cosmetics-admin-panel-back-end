import {
  PrismaRefreshTokensRepository,
  PrismaUsersRepository,
} from '../../../database/repositories/prisma';
import { CreateRefreshTokensUseCase } from '../../refresh-tokens/create';

export function makeCreateRefreshTokensUseCase(): CreateRefreshTokensUseCase {
  const refreshTokensRepo = new PrismaRefreshTokensRepository();
  const usersRepo = new PrismaUsersRepository();

  return new CreateRefreshTokensUseCase(refreshTokensRepo, usersRepo);
}
