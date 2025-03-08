import { WrongPasswordLengthError } from '../errors';
import { usersFirstPasswordSchema } from '../libs/zod-schemas/users-schemas';

export async function randomPasswordGenerator(
  length: number = 10,
): Promise<string> {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const specialCharacters = '!@#$%^&*()-_+=~[]{}|;:,.<>?';
  const numbers = '0123456789';

  if (length < 8) {
    throw new WrongPasswordLengthError('Error generating password, try again.');
  }

  let password = '';
  password += uppercaseLetters.charAt(
    Math.floor(Math.random() * uppercaseLetters.length),
  );
  password += lowercaseLetters.charAt(
    Math.floor(Math.random() * lowercaseLetters.length),
  );
  password += specialCharacters.charAt(
    Math.floor(Math.random() * specialCharacters.length),
  );
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));

  const allCharacters =
    uppercaseLetters + lowercaseLetters + specialCharacters + numbers;
  const remainingLength = length - password.length;

  for (let i = 0; i < remainingLength; i++) {
    password += allCharacters.charAt(
      Math.floor(Math.random() * allCharacters.length),
    );
  }

  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  await usersFirstPasswordSchema.parseAsync({ password });

  return password;
}
