"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateProductsUseCase = makeUpdateProductsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const update_1 = require("../../products/update");
function makeUpdateProductsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new update_1.UpdateProductsUseCase(productsRepo, categoriesRepo);
}
