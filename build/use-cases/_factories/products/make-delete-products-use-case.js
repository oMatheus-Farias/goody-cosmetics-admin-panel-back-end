"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteProductsUseCase = makeDeleteProductsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const delete_1 = require("../../products/delete");
function makeDeleteProductsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new delete_1.DeleteProductsUseCase(productsRepo);
}
