"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesSchema = exports.updateCategoriesSchema = exports.findAllCategoriesWithParamsSchema = exports.categoriesSchema = void 0;
const zod_1 = require("zod");
exports.categoriesSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name is required and must be a string',
    })
        .trim()
        .min(1, {
        message: 'Name must have at least 1 character',
    })
        .max(255, {
        message: 'Name must have at most 255 characters',
    }),
});
exports.findAllCategoriesWithParamsSchema = zod_1.z.object({
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
exports.updateCategoriesSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string({
        required_error: 'Category ID is required and must be a string',
    })
        .uuid({
        message: 'Category ID must be a valid UUID',
    }),
    name: zod_1.z
        .string({
        required_error: 'Name is required and must be a string',
    })
        .trim()
        .min(1, {
        message: 'Name must have at least 1 character',
    })
        .max(25, {
        message: 'Name must have at most 25 characters',
    }),
});
exports.deleteCategoriesSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string({
        required_error: 'Category ID is required and must be a string',
    })
        .uuid({
        message: 'Category ID must be a valid UUID',
    }),
});
