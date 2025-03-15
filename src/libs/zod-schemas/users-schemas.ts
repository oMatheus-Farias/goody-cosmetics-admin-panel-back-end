import { z } from 'zod';

export const usersSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .trim()
    .min(2, {
      message: 'First name is too short',
    })
    .max(55, {
      message: 'First name is too long',
    }),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .trim()
    .min(2, {
      message: 'Last name is too short',
    })
    .max(55, {
      message: 'Last name is too long',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
  role: z
    .enum(['ROOT', 'ADMIN'], {
      required_error: 'Role is required',
    })
    .optional(),
});

export const usersFirstPasswordSchema = z.object({
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

export const findAllUsersWithParamsSchema = z.object({
  page: z.coerce
    .number({
      required_error: 'Page index is required and must be a number',
    })
    .int({
      message: 'Page index must be an integer',
    })
    .optional(),
  searchTerm: z
    .string({
      required_error: 'Search term is required and must be a string',
    })
    .optional(),
});

export const updateUsersSchema = z.object({
  userId: z
    .string({
      required_error: 'User ID is required',
    })
    .uuid({
      message: 'Invalid user ID',
    }),
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .trim()
    .min(2, {
      message: 'First name is too short',
    })
    .max(55, {
      message: 'First name is too long',
    })
    .optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .trim()
    .min(2, {
      message: 'Last name is too short',
    })
    .max(55, {
      message: 'Last name is too long',
    })
    .optional(),
  role: z
    .enum(['ROOT', 'ADMIN'], {
      required_error: 'Role is required',
    })
    .optional(),
});

export const deleteUsersSchema = z.object({
  userId: z
    .string({
      required_error: 'User ID is required',
    })
    .uuid({
      message: 'Invalid user ID',
    }),
});
