import { beforeEach, describe, expect, it } from 'vitest';

import type { PasswordHasher } from '../../adapters/interfaces/password-hasher';
import { PasswordHasherAdapter } from '../../adapters/password-hasher-adapter';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces';
import { AlreadyExistsError } from '../../errors';
import { CreateUsersUseCase } from './create';

let userRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let sut: CreateUsersUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  passwordHash: 'password',
};

describe('Create User', () => {
  beforeEach(async () => {
    userRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    sut = new CreateUsersUseCase(userRepo, passwordHasher);

    await sut.execute({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash: userData.passwordHash,
    });
  });

  it('should be able create user', async () => {
    const user = await userRepo.findByEmail(userData.email);

    expect(user).not.toBe(null);
  });

  it('should throw error if email is already in use', async () => {
    const otherUserFirstName = 'Jane';

    await expect(
      sut.execute({
        firstName: otherUserFirstName,
        lastName: userData.lastName,
        email: userData.email,
        passwordHash: userData.passwordHash,
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
