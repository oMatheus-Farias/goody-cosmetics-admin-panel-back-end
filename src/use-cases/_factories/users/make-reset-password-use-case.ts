import { PasswordHasherAdapter } from '../../../adapters';
import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { ResetPasswordUseCase } from '../../users/reset-password';

export function makeResetPasswordUseCase(): ResetPasswordUseCase {
  const usersRepo = new PrismaUsersRepository();
  const passwordHasher = new PasswordHasherAdapter();
  return new ResetPasswordUseCase(usersRepo, passwordHasher);
}
