import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { PasswordCompareAdapter, PasswordHasherAdapter } from '../../adapters';
import type {
  PasswordCompare,
  PasswordHasher,
} from '../../adapters/interfaces';
import {
  InMemoryRefreshTokensRepository,
  InMemoryUsersRepository,
} from '../../database/repositories/in-memory';
import type {
  RefreshTokensRepository,
  UsersRepository,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import { AuthUsersUseCase } from '../sessions/auth-users';
import { CreateUsersUseCase } from '../users/create';
import { CreateRefreshTokensUseCase } from './create';

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
});
