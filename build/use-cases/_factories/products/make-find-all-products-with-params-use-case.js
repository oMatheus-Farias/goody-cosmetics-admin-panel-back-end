"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllProductsWithParamsUseCase = makeFindAllProductsWithParamsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_with_params_1 = require("../../products/find-all-with-params");
function makeFindAllProductsWithParamsUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new find_all_with_params_1.FindAllProductsWithParamsUseCase(productsRepo);
}
