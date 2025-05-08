"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindProductsByIdUseCase = makeFindProductsByIdUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_by_id_1 = require("../../products/find-by-id");
function makeFindProductsByIdUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new find_by_id_1.FindProductsByIdUseCase(productsRepo);
}
