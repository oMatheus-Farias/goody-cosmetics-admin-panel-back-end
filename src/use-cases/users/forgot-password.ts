import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';

export class ForgotPasswordUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(
    email: string,
    resetToken: string,
    resetTokenExpiresAt: Date,
  ): Promise<void> {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await Promise.all([
      this.usersRepo.forgotPassword(user.id, resetToken, resetTokenExpiresAt),
      sendEmail(
        user.firstName,
        user.email,
        null,
        resetToken,
        'forgot-password',
      ),
    ]);
  }
}
