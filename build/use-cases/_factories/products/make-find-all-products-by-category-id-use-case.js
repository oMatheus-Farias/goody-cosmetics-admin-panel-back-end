"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllProductsByCategoryIdUseCase = makeFindAllProductsByCategoryIdUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_by_category_id_1 = require("../../products/find-all-by-category-id");
function makeFindAllProductsByCategoryIdUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new find_all_by_category_id_1.FindAllProductsByCategoryIdUseCase(productsRepo, categoriesRepo);
}
