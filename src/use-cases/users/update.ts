import type { Prisma } from '@prisma/client';

import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { AlreadyExistsError, NotFoundError } from '../../errors';

export class UpdateUsersUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(userId: string, data: Prisma.UserUpdateInput): Promise<void> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (data.firstName && data.lastName) {
      const userWithSameNames = await this.usersRepo.findByNames(
        data.firstName as string,
        data.lastName as string,
      );
      if (userWithSameNames && userWithSameNames.id !== userId) {
        throw new AlreadyExistsError('User with same names already exists');
      }
    }

    await this.usersRepo.update(userId, data);
  }
}
