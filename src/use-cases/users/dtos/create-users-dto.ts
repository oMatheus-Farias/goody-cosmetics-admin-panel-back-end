import type { $Enums } from '@prisma/client';

export interface ICreateUsersDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: $Enums.UserRole;
}
