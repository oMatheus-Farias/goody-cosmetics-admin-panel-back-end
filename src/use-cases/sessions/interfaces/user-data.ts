import type { $Enums } from '@prisma/client';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: $Enums.UserRole;
  refreshToken: string;
}
