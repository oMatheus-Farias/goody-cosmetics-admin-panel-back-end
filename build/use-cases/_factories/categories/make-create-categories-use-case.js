"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateCategoriesUseCase = makeCreateCategoriesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const create_1 = require("../../categories/create");
function makeCreateCategoriesUseCase() {
    const categoriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new create_1.CreateCategoriesUseCase(categoriesRepo);
}
