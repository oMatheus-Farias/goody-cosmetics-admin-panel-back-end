import { hash } from 'bcryptjs';

import { PasswordHasher } from './interfaces/password-hasher';

export class PasswordHasherAdapter implements PasswordHasher {
  async hash(password: string) {
    return hash(password, 12);
  }
}
