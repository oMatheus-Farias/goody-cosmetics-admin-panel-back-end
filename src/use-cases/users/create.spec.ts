import { beforeEach, describe, expect, it } from 'vitest';

import type { PasswordHasher } from '../../adapters/interfaces/password-hasher';
import { PasswordHasherAdapter } from '../../adapters/password-hasher-adapter';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces';
import { AlreadyExistsError } from '../../errors';
import { CreateUsersUseCase } from './create';

let usersRepo: UsersRepository;
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
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    sut = new CreateUsersUseCase(usersRepo, passwordHasher);

    await sut.execute(userData);
  });

  it('should be able create user', async () => {
    const user = await usersRepo.findByEmail(userData.email);

    expect(user).not.toBe(null);
  });

  it('should throw error if email is already in use', async () => {
    const otherUserFirstName = 'Jane';

    await expect(
      sut.execute({
        ...userData,
        firstName: otherUserFirstName,
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });

  it('should throw error if names are already in use', async () => {
    const otherUserEmail = 'janedoe@email.com';

    await expect(
      sut.execute({
        ...userData,
        email: otherUserEmail,
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
