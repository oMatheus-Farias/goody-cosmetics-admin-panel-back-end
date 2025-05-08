"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateProductsUseCase = makeCreateProductsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const create_1 = require("../../products/create");
function makeCreateProductsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new create_1.CreateProductsUseCase(productsRepo, categoriesRepo);
}
