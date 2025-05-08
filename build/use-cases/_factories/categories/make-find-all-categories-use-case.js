"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllCategoriesUseCase = makeFindAllCategoriesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_1 = require("../../categories/find-all");
function makeFindAllCategoriesUseCase() {
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new find_all_1.FindAllCategoriesUseCase(categoriesRepo);
}
