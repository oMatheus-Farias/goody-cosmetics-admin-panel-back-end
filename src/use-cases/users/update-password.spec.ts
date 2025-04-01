import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { PasswordCompareAdapter, PasswordHasherAdapter } from '../../adapters';
import type {
  PasswordCompare,
  PasswordHasher,
} from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CreateUsersUseCase } from './create';
import { UpdatePasswordUseCase } from './update-password';

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
});
