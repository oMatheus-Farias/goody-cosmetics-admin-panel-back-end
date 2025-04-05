import type { PasswordHasher } from '../../adapters/interfaces';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CredentialsError, NotFoundError } from '../../errors';

export class ResetPasswordUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepo.findByResetToken(token);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const now = new Date();
    if (now > user.resetTokenExpiresAt!) {
      await this.usersRepo.setNullResetToken(user.id);
      throw new CredentialsError('Token expired');
    }

    await this.usersRepo.setNullResetToken(user.id);
    const hashedNewPassword = await this.passwordHasher.hash(newPassword);

    await this.usersRepo.updatePassword(user.id, hashedNewPassword);
  }
}
