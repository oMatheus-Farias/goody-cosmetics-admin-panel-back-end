import type { $Enums } from '@prisma/client';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { PasswordHasherAdapter } from '../../adapters';
import type { PasswordHasher } from '../../adapters/interfaces';
import { InMemoryUsersRepository } from '../../database/repositories/in-memory';
import type { UsersRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';
import { sendEmail } from '../../libs/nodemailer/config/mail';
import { CreateUsersUseCase } from './create';
import { FindByIdUserUseCase } from './find-by-id';

vi.mock('../../libs/nodemailer/config/mail', () => ({
  sendEmail: vi.fn(),
}));

let usersRepo: UsersRepository;
let passwordHasher: PasswordHasher;
let createUsersUseCase: CreateUsersUseCase;
let sut: FindByIdUserUseCase;
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  password: 'password',
  role: 'ADMIN' as $Enums.UserRole,
};

describe('Find By Id User', () => {
  beforeEach(async () => {
    usersRepo = new InMemoryUsersRepository();
    passwordHasher = new PasswordHasherAdapter();
    createUsersUseCase = new CreateUsersUseCase(usersRepo, passwordHasher);
    sut = new FindByIdUserUseCase(usersRepo);

    (sendEmail as Mock).mockResolvedValue('Email sending success');
    await createUsersUseCase.execute(userData);
  });

  it('should be able to find user by id', async () => {
    const user = await usersRepo.findByEmail(userData.email);

    const userByid = await sut.execute(user!.id);

    expect(userByid).toHaveProperty('id');
    expect(userByid).toHaveProperty('firstName');
    expect(userByid).toHaveProperty('lastName');
    expect(userByid).toHaveProperty('role');
  });

  it('should not be able to find user by id if user does not exist', async () => {
    const userId = 'non-existing-user-id';

    await expect(() => sut.execute(userId)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
