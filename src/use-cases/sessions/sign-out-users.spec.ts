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
import type {
  RefreshTokensRepository,
  UsersRepository,
} from '../../database/repositories/interfaces';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from '../users/create';
import { AuthUsersUseCase } from './auth-users';
import { SignOutUsersUseCase } from './sign-out-users';

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
let authUsersUseCase: AuthUsersUseCase;
let sut: SignOutUsersUseCase;

describe('Sign Out Users', () => {
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
    sut = new SignOutUsersUseCase(usersRepo, refreshTokensRepo);

    await authUsersUseCase.execute({
      email: userData.email,
      password: userData.password,
    });
  });

  it('should be able to sign out user', async () => {
    const user = await usersRepo.findByEmail(userData.email);

    await expect(sut.execute(user!.id)).resolves.toBeUndefined();
    const refreshToken = await refreshTokensRepo.findAllByUserId(user!.id);
    expect(refreshToken).toHaveLength(0);
  });
});
