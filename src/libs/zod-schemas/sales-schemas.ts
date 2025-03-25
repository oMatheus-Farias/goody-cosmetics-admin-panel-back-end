import { z } from 'zod';

export const findAllSalesWithParamsSchema = z.object({
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

export const createSalesSchema = z.object({
  saleDate: z
    .string({
      required_error: 'Sale date is required',
    })
    .datetime({
      message: 'Invalid date format',
    }),
  items: z.array(
    z.object({
      productId: z
        .string({
          required_error: 'Product ID is required',
        })
        .uuid({
          message: 'Invalid product ID',
        }),
      quantity: z
        .number({
          required_error: 'Quantity is required',
        })
        .int({
          message: 'Quantity must be an integer',
        }),
      unitPrice: z
        .number({
          required_error: 'Unit price is required',
        })
        .positive({
          message: 'Unit price must be a positive number',
        }),
    }),
  ),
});

export const updateSalesSchema = z.object({
  saleId: z
    .string({
      required_error: 'Sale ID is required',
    })
    .uuid({
      message: 'Invalid sale ID',
    }),
  saleDate: z
    .string({
      required_error: 'Sale date is required',
    })
    .datetime({
      message: 'Invalid date format',
    })
    .optional(),
  items: z
    .array(
      z.object({
        saleItemId: z
          .string({
            required_error: 'Sale Item ID is required',
          })
          .uuid({
            message: 'Invalid sale item ID',
          })
          .optional(),
        quantity: z
          .number({
            required_error: 'Quantity is required',
          })
          .int({
            message: 'Quantity must be an integer',
          })
          .optional(),
        unitPrice: z
          .number({
            required_error: 'Unit price is required',
          })
          .positive({
            message: 'Unit price must be a positive number',
          })
          .optional(),
      }),
    )
    .optional(),
});

export const deleteSalesSchema = z.object({
  saleId: z
    .string({
      required_error: 'Sale ID is required',
    })
    .uuid({
      message: 'Invalid sale ID',
    }),
});

export const deleteSaleItemsSchema = z.object({
  saleItemId: z
    .string({
      required_error: 'Sale Item ID is required',
    })
    .uuid({
      message: 'Invalid sale item ID',
    }),
});
