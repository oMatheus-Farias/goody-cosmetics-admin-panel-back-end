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
import { NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { AuthUsersUseCase } from '../sessions/auth-users';
import { CreateUsersUseCase } from '../users/create';
import { CreateRefreshTokensUseCase } from './create';

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let refreshTokensRepo: RefreshTokensRepository;
let passwordCompare: PasswordCompare;
let authUsersUseCase: AuthUsersUseCase;
let sut: CreateRefreshTokensUseCase;

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Create RefreshTokens', () => {
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
    authUsersUseCase = new AuthUsersUseCase(
      usersRepo,
      refreshTokensRepo,
      passwordCompare,
    );

    sut = new CreateRefreshTokensUseCase(refreshTokensRepo, usersRepo);
  });

  it('should be able to create refresh token', async () => {
    const { refreshToken } = await authUsersUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    await sut.execute(refreshToken);

    expect(refreshToken).toStrictEqual(expect.any(String));
  });

  it('should throw error if refresh token not exists', async () => {
    await authUsersUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    await expect(sut.execute('invalid-refresh-token')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should throw error if user not exists', async () => {
    const { refreshToken } = await authUsersUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    const user = await usersRepo.findByEmail(userData.email);
    await usersRepo.delete(user!.id as string);

    await expect(sut.execute(refreshToken)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
