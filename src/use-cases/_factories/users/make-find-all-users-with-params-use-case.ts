import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { FindAllUsersWithParamsUseCase } from '../../users/find-all-with-params';

export function makeFindAllUsersWithParamsUseCase(): FindAllUsersWithParamsUseCase {
  const usersRepo = new PrismaUsersRepository();
  return new FindAllUsersWithParamsUseCase(usersRepo);
}
