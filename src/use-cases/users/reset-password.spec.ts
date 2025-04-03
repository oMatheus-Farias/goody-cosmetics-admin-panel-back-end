import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CredentialsError, NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from './create';
import { ForgotPasswordUseCase } from './forgot-password';
import { ResetPasswordUseCase } from './reset-password';

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let forgotPasswordUseCase: ForgotPasswordUseCase;
let sut: ResetPasswordUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

describe('Reset Password', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepo);
    sut = new ResetPasswordUseCase(usersRepo, passwordHasher);

    (sendEmail as Mock).mockResolvedValue('Email sending success');
    await createUsersUseCase.execute(userData);
    await forgotPasswordUseCase.execute(
      userData.email,
      'resetToken',
      new Date(),
    );
  });

  it('should be able to reset password', async () => {
    const newPassword = 'newPassword';

    await expect(
      sut.execute(userData.email, 'resetToken', newPassword),
    ).resolves.toBeUndefined();
  });

  it('should throw error if user not found', async () => {
    const invalidEmail = 'invalid-email';
    const newPassword = 'newPassword';

    await expect(
      sut.execute(invalidEmail, 'resetToken', newPassword),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw error if token is invalid', async () => {
    const newPassword = 'newPassword';

    await expect(
      sut.execute(userData.email, 'invalidToken', newPassword),
    ).rejects.toBeInstanceOf(CredentialsError);
  });

  it('should throw error if token is expired', async () => {
    const newPassword = 'newPassword';
    const now = new Date();
    now.setDate(now.getDate() - 1);

    await forgotPasswordUseCase.execute(userData.email, 'token', now);

    await expect(
      sut.execute(userData.email, 'token', newPassword),
    ).rejects.toBeInstanceOf(CredentialsError);
  });
});
