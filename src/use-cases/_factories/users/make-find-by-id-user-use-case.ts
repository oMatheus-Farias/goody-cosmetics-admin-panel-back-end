import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { FindByIdUserUseCase } from '../../users/find-by-id';

export function makeFindByIdUserUseCase(): FindByIdUserUseCase {
  const usersRepo = new PrismaUsersRepository();
  return new FindByIdUserUseCase(usersRepo);
}
