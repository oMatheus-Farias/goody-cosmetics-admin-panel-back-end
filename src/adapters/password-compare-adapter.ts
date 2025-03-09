import { compare } from 'bcryptjs';

import { PasswordCompare } from './interfaces/password-compare';

export class PasswordCompareAdapter implements PasswordCompare {
  async compare(password: string, passwordHash: string) {
    return compare(password, passwordHash);
  }
}
