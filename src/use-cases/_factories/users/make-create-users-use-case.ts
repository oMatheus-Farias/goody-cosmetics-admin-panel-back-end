import { PasswordHasherAdapter } from '../../../adapters/password-hasher-adapter';
import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { CreateUsersUseCase } from '../../users/create';

export function makeCreateUsersUseCase(): CreateUsersUseCase {
  const usersRepo = new PrismaUsersRepository();
  const passwordHasher = new PasswordHasherAdapter();
  return new CreateUsersUseCase(usersRepo, passwordHasher);
}
