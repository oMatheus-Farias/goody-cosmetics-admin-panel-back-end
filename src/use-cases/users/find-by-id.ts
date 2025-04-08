import type { User } from '@prisma/client';

import type { UsersRepository } from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class FindByIdUserUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(
    userId: string,
  ): Promise<Pick<User, 'id' | 'firstName' | 'lastName' | 'role'> | null> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
