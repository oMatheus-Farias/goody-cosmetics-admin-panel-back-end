import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { DeleteUsersUseCase } from '../../users/delete';

export function makeDeleteUsersUseCase(): DeleteUsersUseCase {
  const usersRepo = new PrismaUsersRepository();
  return new DeleteUsersUseCase(usersRepo);
}
