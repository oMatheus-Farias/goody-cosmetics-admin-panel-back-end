"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteCategoriesUseCase = makeDeleteCategoriesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const delete_1 = require("../../categories/delete");
function makeDeleteCategoriesUseCase() {
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new delete_1.DeleteCategoriesUseCase(categoriesRepo);
}
