"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllProductsUseCase = makeFindAllProductsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_1 = require("../../products/find-all");
function makeFindAllProductsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new find_all_1.FindAllProductsUseCase(productsRepo);
}
