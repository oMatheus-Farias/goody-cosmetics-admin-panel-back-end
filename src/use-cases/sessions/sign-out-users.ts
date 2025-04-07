import type {
  RefreshTokensRepository,
  UsersRepository,
} from '../../database/repositories/interfaces';
import { NotFoundError } from '../../errors';

export class SignOutUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly refreshTokensRepo: RefreshTokensRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.refreshTokensRepo.deleteAll(user.id);
  }
}
