"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteProductsUseCase = makeDeleteProductsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const delete_1 = require("../../products/delete");
function makeDeleteProductsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    return new delete_1.DeleteProductsUseCase(productsRepo, salesRepo);
}
