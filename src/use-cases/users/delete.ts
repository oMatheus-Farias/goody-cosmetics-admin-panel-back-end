import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { NotFoundError } from '../../errors';

export class DeleteUsersUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.usersRepo.delete(userId);
  }
}
