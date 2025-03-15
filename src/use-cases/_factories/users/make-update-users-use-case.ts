import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { UpdateUsersUseCase } from '../../users/update';

export function makeUpdateUsersUseCase(): UpdateUsersUseCase {
  const usersRepo = new PrismaUsersRepository();
  return new UpdateUsersUseCase(usersRepo);
}
