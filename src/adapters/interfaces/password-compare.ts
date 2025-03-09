export interface PasswordCompare {
  compare(password: string, passwordHash: string): Promise<boolean>;
}
