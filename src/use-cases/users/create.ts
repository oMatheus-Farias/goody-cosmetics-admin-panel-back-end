import type { Prisma } from '@prisma/client';

import type { PasswordHasher } from '../../adapters/interfaces/password-hasher';
import type { UsersRepository } from '../../database/repositories/interfaces';
import { AlreadyExistsError } from '../../errors';
import { randomPasswordGenerator } from '../../functions/random-password-generator';

export class CreateUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(data: Prisma.UserCreateInput): Promise<void> {
    const [emailAlreadyExists, namesAlreadyExists] = await Promise.all([
      this.usersRepo.findByEmail(data.email),
      this.usersRepo.findByNames(data.firstName, data.lastName),
    ]);

    if (emailAlreadyExists || namesAlreadyExists) {
      throw new AlreadyExistsError(
        'User already exists, verify the email or names',
      );
    }

    const firstPassword = await randomPasswordGenerator();
    //TODO: remove console.log implementation send email with password
    console.log('firstPassword', firstPassword);

    const firstPasswordHashed = await this.passwordHasher.hash(firstPassword);

    await this.usersRepo.create({
      ...data,
      passwordHash: firstPasswordHashed,
    });
  }
}
