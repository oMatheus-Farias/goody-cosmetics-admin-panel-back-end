"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOutUsersSchema = exports.authUsersSchema = void 0;
const zod_1 = require("zod");
exports.authUsersSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        message: 'Email is required',
    })
        .email({
        message: 'Invalid email',
    }),
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
exports.signOutUsersSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: 'User ID is required.',
    })
        .uuid({
        message: 'Invalid User ID.',
    }),
});
