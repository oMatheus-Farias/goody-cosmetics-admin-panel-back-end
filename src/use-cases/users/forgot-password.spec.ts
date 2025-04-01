import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from './create';
import { ForgotPasswordUseCase } from './forgot-password';

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: ForgotPasswordUseCase;
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

describe('Forgot Password', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new ForgotPasswordUseCase(usersRepo);

    await createUsersUseCase.execute(userData);
  });

  it('should be able to send forgot password email', async () => {
    (sendEmail as Mock).mockResolvedValue('Email sending success');

    await expect(
      sut.execute(userData.email, 'resetToken', new Date()),
    ).resolves.toBeUndefined();
    expect(sendEmail).toHaveBeenCalledWith(
      userData.firstName,
      userData.email,
      null,
      'resetToken',
      'forgot-password',
    );
  });

  it('should throw error if user not found', async () => {
    const invalidEmail = 'invalid-email';

    await expect(
      sut.execute(invalidEmail, 'resetToken', new Date()),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
