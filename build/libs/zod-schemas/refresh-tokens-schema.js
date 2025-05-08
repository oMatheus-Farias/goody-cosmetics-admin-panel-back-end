"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokensSchema = void 0;
const zod_1 = require("zod");
exports.refreshTokensSchema = zod_1.z.object({
    refreshTokenId: zod_1.z
        .string({
        message: 'refreshTokenId is required',
    })
        .uuid({
        message: 'refreshTokenId must be a valid UUID',
    }),
});
