import type {
  TFindAllWithParams,
  UsersRepository,
} from '../../database/repositories/interfaces/users-repository';

export class FindAllUsersWithParamsUseCase {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(
    page: number,
    searchTerm?: string,
  ): Promise<TFindAllWithParams> {
    return await this.usersRepo.findAllWithParams(page, searchTerm);
  }
}
