"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllCategoriesWithParamsUseCase = makeFindAllCategoriesWithParamsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_with_params_1 = require("../../categories/find-all-with-params");
function makeFindAllCategoriesWithParamsUseCase() {
    const cateroriesRepo = new prisma_1.PrismaCategoriesRepository();
    return new find_all_with_params_1.FindAllCategoriesWithParamsUseCase(cateroriesRepo);
}
