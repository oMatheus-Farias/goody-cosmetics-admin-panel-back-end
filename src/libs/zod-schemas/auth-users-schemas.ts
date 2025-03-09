import { z } from 'zod';

export const authUsersSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, {
      message: 'Password must have at least 8 characters.',
    })
    .max(255, {
      message: 'Password must have at most 255 characters.',
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/,
      {
        message:
          'The password must have at least one uppercase and one lowercase letter, at least one number and one special character.',
      },
    ),
});
