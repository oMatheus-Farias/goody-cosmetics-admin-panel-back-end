import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { NotFoundError } from '../../errors';
import { CreateUsersUseCase } from './create';
import { DeleteUsersUseCase } from './delete';

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: DeleteUsersUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Delete Users', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new DeleteUsersUseCase(usersRepo);

    await createUsersUseCase.execute(userData);
  });

  it('should be able delete user', async () => {
    const user = await usersRepo.findByEmail(userData.email);

    await sut.execute(user!.id);
    const deletedUser = await usersRepo.findById(user!.id);

    expect(deletedUser).toBeNull();
  });

  it('should throw error if user not exists', async () => {
    await expect(sut.execute('invalid-id')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
