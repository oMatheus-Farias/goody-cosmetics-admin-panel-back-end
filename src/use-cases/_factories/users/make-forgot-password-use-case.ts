import { PrismaUsersRepository } from '../../../database/repositories/prisma';
import { ForgotPasswordUseCase } from '../../users/forgot-password';

export function makeForgotPasswordUseCase(): ForgotPasswordUseCase {
  const userRepo = new PrismaUsersRepository();
  return new ForgotPasswordUseCase(userRepo);
}
