export class WrongPasswordLengthError extends Error {
  constructor(message = 'Password must be at least 6 characters long') {
    super(message);
    this.name = 'WrongPasswordLengthError';
  }
}
