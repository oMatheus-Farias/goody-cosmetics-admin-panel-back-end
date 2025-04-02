import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordCompareAdapter, PasswordHasherAdapter } from '../../adapters';
import type {
  PasswordCompare,
  PasswordHasher,
} from '../../adapters/interfaces';
import {
  InMemoryRefreshTokensRepository,
  InMemoryUsersRepository,
} from '../../database/repositories/in-memory';
import type { RefreshTokensRepository } from '../../database/repositories/interfaces';
import { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CredentialsError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from '../users/create';
import { AuthUsersUseCase } from './auth-users';

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

let refreshTokensRepo: RefreshTokensRepository;
let passwordCompare: PasswordCompare;
let sut: AuthUsersUseCase;

describe('Auth User', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    (sendEmail as Mock).mockResolvedValue('Email sending success');
    await createUsersUseCase.execute({
      ...userData,
      password: userData.password,
    });

    refreshTokensRepo = new InMemoryRefreshTokensRepository();
    passwordCompare = new PasswordCompareAdapter();
    sut = new AuthUsersUseCase(usersRepo, refreshTokensRepo, passwordCompare);
  });

  it('should be able to authenticate user', async () => {
    const user = await sut.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(user).not.toBe(null);
  });

  it('should throw error if email invalid', async () => {
    const email = 'invalid-email';

    await expect(
      sut.execute({ email, password: userData.password }),
    ).rejects.toBeInstanceOf(CredentialsError);
  });

  it('should throw error if password invalid', async () => {
    const password = 'invalid-password';

    await expect(
      sut.execute({ email: userData.email, password }),
    ).rejects.toBeInstanceOf(CredentialsError);
  });
});
