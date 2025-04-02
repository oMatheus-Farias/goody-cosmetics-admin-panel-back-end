import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordCompareAdapter, PasswordHasherAdapter } from '../../adapters';
import type {
  PasswordCompare,
  PasswordHasher,
} from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CredentialsError, NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from './create';
import { UpdatePasswordUseCase } from './update-password';

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

let usersRepo: UsersRepository;
let passwordCompare: PasswordCompare;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: UpdatePasswordUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Update Password', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordCompare = new PasswordCompareAdapter();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new UpdatePasswordUseCase(usersRepo, passwordCompare, passwordHasher);

    (sendEmail as Mock).mockResolvedValue('Email sending success');
    await createUsersUseCase.execute(userData);
  });

  it('should be able to update password', async () => {
    const user = await usersRepo.findByEmail(userData.email);
    const newPassword = 'newPassword';

    await expect(
      sut.execute(user!.id, userData.password, newPassword),
    ).resolves.toBe(undefined);
    const updatedUser = await usersRepo.findByIdWithReturnedPassword(user!.id);
    expect(updatedUser).not.toBe(null);
  });

  it('should throw error if user not found', async () => {
    const newPassword = 'newPassword';
    const invalidUserId = 'invalid-user-id';

    await expect(
      sut.execute(invalidUserId, userData.password, newPassword),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw error if password is invalid', async () => {
    const user = await usersRepo.findByEmail(userData.email);
    const newPassword = 'newPassword';
    const invalidOldPassword = 'invalidOldPassword';

    await expect(
      sut.execute(user!.id, invalidOldPassword, newPassword),
    ).rejects.toBeInstanceOf(CredentialsError);
  });
});
