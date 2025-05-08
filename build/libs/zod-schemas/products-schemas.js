"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductsSchema = exports.updateProductsImagesSchema = exports.updateProductsSchema = exports.createProductsSchema = exports.findAllProductsWithParamsSchema = exports.findAllProductsByCategoryIdSchema = exports.findAllProductsSchema = exports.findAllProductsByIdSchema = void 0;
const zod_1 = require("zod");
exports.findAllProductsByIdSchema = zod_1.z.object({
    productId: zod_1.z
        .string({
        required_error: 'Product id is required and must be a string',
    })
        .uuid({
        message: 'Product id must be a valid UUID',
    }),
});
exports.findAllProductsSchema = zod_1.z.object({
    ordenation: zod_1.z.enum(['A-Z', 'Z-A', 'LOWER_PRICE', 'HIGHER_PRICE'], {
        message: 'Ordernation is required and must be A-Z or Z-A or LOWER_PRICE or HIGHER_PRICE',
    }),
});
exports.findAllProductsByCategoryIdSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string({
        required_error: 'Category id is required and must be a string',
    })
        .uuid({
        message: 'Category id must be a valid UUID',
    })
        .optional(),
    ordenation: zod_1.z.enum(['A-Z', 'Z-A', 'LOWER_PRICE', 'HIGHER_PRICE'], {
        message: 'Ordernation is required and must be A-Z or Z-A or LOWER_PRICE or HIGHER_PRICE',
    }),
});
exports.findAllProductsWithParamsSchema = zod_1.z.object({
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
exports.createProductsSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        message: 'Name is required',
    })
        .trim()
        .min(2, {
        message: 'Name must be at least 2 characters long',
    })
        .max(255, {
        message: 'Name must be at most 255 characters long',
    }),
    description: zod_1.z
        .string({
        message: 'Description is required',
    })
        .trim()
        .min(2, {
        message: 'Description must be at least 2 characters long',
    }),
    categoryId: zod_1.z
        .string({
        message: 'Category is required',
    })
        .uuid({}),
    oldPrice: zod_1.z.coerce
        .number({
        message: 'Old price is required',
    })
        .positive({
        message: 'Old price must be a positive number',
    }),
    currentPrice: zod_1.z.coerce
        .number({
        message: 'Current price is required',
    })
        .positive({
        message: 'Current price must be a positive number',
    }),
    stockQuantity: zod_1.z.coerce.number({
        message: 'Stock quantity is required',
    }),
    image01: zod_1.z.object({
        name: zod_1.z.string().nonempty(),
        type: zod_1.z.string().nonempty(),
        size: zod_1.z.number().positive(),
    }),
    image02: zod_1.z.object({
        name: zod_1.z.string().nonempty(),
        type: zod_1.z.string().nonempty(),
        size: zod_1.z.number().positive(),
    }),
});
exports.updateProductsSchema = zod_1.z.object({
    productId: zod_1.z
        .string({
        required_error: 'Product id is required and must be a string',
    })
        .uuid({
        message: 'Product id must be a valid UUID',
    }),
    name: zod_1.z
        .string({
        message: 'Name is required',
    })
        .trim()
        .min(2, {
        message: 'Name must be at least 2 characters long',
    })
        .max(255, {
        message: 'Name must be at most 255 characters long',
    })
        .optional(),
    description: zod_1.z
        .string({
        message: 'Description is required',
    })
        .trim()
        .min(2, {
        message: 'Description must be at least 2 characters long',
    })
        .optional(),
    categoryId: zod_1.z
        .string({
        message: 'Category is required',
    })
        .uuid({})
        .optional(),
    oldPrice: zod_1.z.coerce
        .number({
        message: 'Old price is required',
    })
        .positive({
        message: 'Old price must be a positive number',
    })
        .optional(),
    currentPrice: zod_1.z.coerce
        .number({
        message: 'Current price is required',
    })
        .positive({
        message: 'Current price must be a positive number',
    })
        .optional(),
    stockQuantity: zod_1.z.coerce
        .number({
        message: 'Stock quantity is required',
    })
        .optional(),
});
exports.updateProductsImagesSchema = zod_1.z.object({
    imageId: zod_1.z
        .string({
        required_error: 'Image id is required and must be a string',
    })
        .uuid({
        message: 'Image id must be a valid UUID',
    }),
    productImage: zod_1.z.object({
        name: zod_1.z.string().nonempty(),
        type: zod_1.z.string().nonempty(),
        size: zod_1.z.number().positive(),
    }),
});
exports.deleteProductsSchema = zod_1.z.object({
    productId: zod_1.z
        .string({
        required_error: 'Product id is required and must be a string',
    })
        .uuid({
        message: 'Product id must be a valid UUID',
    }),
});
