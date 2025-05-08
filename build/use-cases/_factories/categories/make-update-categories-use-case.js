"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateCategoriesUseCase = makeUpdateCategoriesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const update_1 = require("../../categories/update");
function makeUpdateCategoriesUseCase() {
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new update_1.UpdateCategoriesUseCase(categoriesRepo);
}
