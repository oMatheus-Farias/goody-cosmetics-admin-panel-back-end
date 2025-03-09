export class CredentialsError extends Error {
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'CredentialsError';
  }
}
