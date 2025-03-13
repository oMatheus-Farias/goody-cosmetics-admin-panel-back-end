import type { User } from '@prisma/client';

export interface IReturnUseCaseData {
  refreshToken: string;
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'role'>;
}
