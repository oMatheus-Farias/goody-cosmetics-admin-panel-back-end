import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from './create';
import { FindAllUsersWithParamsUseCase } from './find-all-with-params';

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: FindAllUsersWithParamsUseCase;
const userData1 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};
const userData2 = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janedoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Find All Users With Params', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new FindAllUsersWithParamsUseCase(usersRepo);

    (sendEmail as Mock).mockResolvedValue('Email sending success');
    await Promise.all([
      createUsersUseCase.execute(userData1),
      createUsersUseCase.execute(userData2),
    ]);
  });

  it('should be able to find all users', async () => {
    const { users } = await sut.execute(0);

    expect(users).toHaveLength(2);
  });

  it('should be able find all users with first name search term', async () => {
    const { users, meta } = await sut.execute(0, userData1.firstName);

    expect(users).toHaveLength(1);
    expect(meta).not.toBe(null);
  });

  it('should be able find all users with last name search term', async () => {
    const { users, meta } = await sut.execute(0, userData2.lastName);

    expect(users).toHaveLength(2);
    expect(meta).not.toBe(null);
  });
});
