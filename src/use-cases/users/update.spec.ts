import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { CreateUsersUseCase } from './create';
import { UpdateUsersUseCase } from './update';

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: UpdateUsersUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Update User', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new UpdateUsersUseCase(usersRepo);

    await createUsersUseCase.execute(userData);
  });

  it('should be able update user', async () => {
    const user = await usersRepo.findByEmail(userData.email);

    await sut.execute(user!.id, {
      firstName: 'Jane',
      lastName: 'Do',
      role: 'ROOT',
    });
    const updatedUser = await usersRepo.findById(user!.id);

    expect(updatedUser?.firstName).toBe('Jane');
    expect(updatedUser?.lastName).toBe('Do');
    expect(updatedUser?.role).toBe('ROOT');
  });
});
