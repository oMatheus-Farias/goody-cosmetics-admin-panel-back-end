"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSaleItemsSchema = exports.deleteSalesSchema = exports.updateSalesSchema = exports.createSalesSchema = exports.findAllSalesWithParamsSchema = void 0;
const zod_1 = require("zod");
exports.findAllSalesWithParamsSchema = zod_1.z.object({
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
exports.createSalesSchema = zod_1.z.object({
    saleDate: zod_1.z
        .string({
        required_error: 'Sale date is required',
    })
        .datetime({
        message: 'Invalid date format',
    }),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z
            .string({
            required_error: 'Product ID is required',
        })
            .uuid({
            message: 'Invalid product ID',
        }),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .int({
            message: 'Quantity must be an integer',
        }),
        unitPrice: zod_1.z
            .number({
            required_error: 'Unit price is required',
        })
            .min(0, {
            message: 'Unit price must be a positive number',
        }),
    })),
});
exports.updateSalesSchema = zod_1.z.object({
    saleId: zod_1.z
        .string({
        required_error: 'Sale ID is required',
    })
        .uuid({
        message: 'Invalid sale ID',
    }),
    saleDate: zod_1.z
        .string({
        required_error: 'Sale date is required',
    })
        .datetime({
        message: 'Invalid date format',
    })
        .optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        saleItemId: zod_1.z
            .string({
            required_error: 'Sale Item ID is required',
        })
            .uuid({
            message: 'Invalid sale item ID',
        })
            .optional(),
        quantity: zod_1.z
            .number({
            required_error: 'Quantity is required',
        })
            .int({
            message: 'Quantity must be an integer',
        })
            .optional(),
        unitPrice: zod_1.z
            .number({
            required_error: 'Unit price is required',
        })
            .positive({
            message: 'Unit price must be a positive number',
        })
            .optional(),
    }))
        .optional(),
});
exports.deleteSalesSchema = zod_1.z.object({
    saleId: zod_1.z
        .string({
        required_error: 'Sale ID is required',
    })
        .uuid({
        message: 'Invalid sale ID',
    }),
});
exports.deleteSaleItemsSchema = zod_1.z.object({
    saleItemId: zod_1.z
        .string({
        required_error: 'Sale Item ID is required',
    })
        .uuid({
        message: 'Invalid sale item ID',
    }),
});
