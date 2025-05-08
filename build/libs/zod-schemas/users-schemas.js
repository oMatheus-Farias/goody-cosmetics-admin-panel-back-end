"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updatePasswordSchema = exports.updateUsersSchema = exports.findAllUsersWithParamsSchema = exports.usersFirstPasswordSchema = exports.findByIdUserSchema = exports.usersSchema = void 0;
const zod_1 = require("zod");
exports.usersSchema = zod_1.z.object({
    firstName: zod_1.z
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
    lastName: zod_1.z
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
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({
        message: 'Invalid email',
    }),
    role: zod_1.z
        .enum(['ROOT', 'ADMIN'], {
        required_error: 'Role is required',
    })
        .optional(),
});
exports.findByIdUserSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User ID is required',
    })
        .uuid({
        message: 'Invalid user ID',
    }),
});
exports.usersFirstPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        required_error: 'Password is required.',
    })
        .min(8, {
        message: 'Password must have at least 8 characters.',
    })
        .max(255, {
        message: 'Password must have at most 255 characters.',
    })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/, {
        message: 'The password must have at least one uppercase and one lowercase letter, at least one number and one special character.',
    }),
});
exports.findAllUsersWithParamsSchema = zod_1.z.object({
    page: zod_1.z.coerce
        .number({
        required_error: 'Page index is required and must be a number',
    })
        .int({
        message: 'Page index must be an integer',
    })
        .optional(),
    searchTerm: zod_1.z
        .string({
        required_error: 'Search term is required and must be a string',
    })
        .optional(),
});
exports.updateUsersSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User ID is required',
    })
        .uuid({
        message: 'Invalid user ID',
    }),
    firstName: zod_1.z
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
    lastName: zod_1.z
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
    role: zod_1.z
        .enum(['ROOT', 'ADMIN'], {
        required_error: 'Role is required',
    })
        .optional(),
});
exports.updatePasswordSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User ID is required',
    })
        .uuid({
        message: 'Invalid user ID',
    }),
    oldPassword: zod_1.z
        .string({
        required_error: 'Old password is required.',
    })
        .min(8, {
        message: 'Old password must have at least 8 characters.',
    })
        .max(255, {
        message: 'Old password must have at most 255 characters.',
    })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/, {
        message: 'The old password must have at least one uppercase and one lowercase letter, at least one number and one special character.',
    }),
    newPassword: zod_1.z
        .string({
        required_error: 'New password is required.',
    })
        .min(8, {
        message: 'New password must have at least 8 characters.',
    })
        .max(255, {
        message: 'New password must have at most 255 characters.',
    })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/, {
        message: 'The new password must have at least one uppercase and one lowercase letter, at least one number and one special character.',
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({
        message: 'Invalid email',
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z
        .string({
        required_error: 'Token is required',
    })
        .min(1, {
        message: 'Token invalid',
    })
        .max(255, {
        message: 'Token invalid',
    }),
    newPassword: zod_1.z
        .string({
        required_error: 'New password is required.',
    })
        .min(8, {
        message: 'New password must have at least 8 characters.',
    })
        .max(255, {
        message: 'New password must have at most 255 characters.',
    })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?";:{}|[~<>=_+-]).{8,}$/, {
        message: 'The new password must have at least one uppercase and one lowercase letter, at least one number and one special character.',
    }),
});
exports.deleteUsersSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User ID is required',
    })
        .uuid({
        message: 'Invalid user ID',
    }),
});
