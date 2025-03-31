import type {
  PasswordCompare,
  PasswordHasher,
} from '../../adapters/interfaces';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CredentialsError, NotFoundError } from '../../errors';

export class UpdatePasswordUseCase {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly passwordCompare: PasswordCompare,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepo.findByIdWithReturnedPassword(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await this.passwordCompare.compare(
      oldPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new CredentialsError('Invalid password');
    }

    const hashedNewPassword = await this.passwordHasher.hash(newPassword);

    await this.userRepo.updatePassword(userId, hashedNewPassword);
  }
}
