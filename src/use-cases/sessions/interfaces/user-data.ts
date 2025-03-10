import type { $Enums } from '@prisma/client';

export interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: $Enums.UserRole;
}
