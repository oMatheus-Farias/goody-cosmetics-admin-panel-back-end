"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateSalesUseCase = makeCreateSalesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const create_1 = require("../../sales/create");
function makeCreateSalesUseCase() {
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new create_1.CreateSalesUseCase(salesRepo, productsRepo);
}
