import {
  PasswordCompareAdapter,
  PasswordHasherAdapter,
} from '../../../adapters';
import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { UpdatePasswordUseCase } from '../../users/update-password';

export function makeUpdatePasswordUseCase(): UpdatePasswordUseCase {
  const userRepo = new PrismaUsersRepository();
  const passwordCompare = new PasswordCompareAdapter();
  const passwordHasher = new PasswordHasherAdapter();
  return new UpdatePasswordUseCase(userRepo, passwordCompare, passwordHasher);
}
