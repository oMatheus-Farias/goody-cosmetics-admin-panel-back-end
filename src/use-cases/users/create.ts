import type { PasswordHasher } from '../../adapters/interfaces/password-hasher';
import type { UsersRepository } from '../../database/repositories/interfaces/users-repository';
import { AlreadyExistsError } from '../../errors';
import type { ICreateUsersDto } from './dtos/create-users-dto';

export class CreateUsersUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(data: ICreateUsersDto): Promise<void> {
    const [emailAlreadyExists, namesAlreadyExists] = await Promise.all([
      this.usersRepo.findByEmail(data.email),
      this.usersRepo.findByNames(data.firstName, data.lastName),
    ]);

    if (emailAlreadyExists || namesAlreadyExists) {
      throw new AlreadyExistsError(
        'User already exists, verify the email or names',
      );
    }

    //TODO: remove console.log implementation send email with password
    console.log('firstPassword', data.password);

    const firstPasswordHashed = await this.passwordHasher.hash(data.password);

    await this.usersRepo.create({
      ...data,
      password: firstPasswordHashed,
    });
  }
}
