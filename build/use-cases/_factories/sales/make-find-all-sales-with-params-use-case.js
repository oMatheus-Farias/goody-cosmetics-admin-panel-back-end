"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllSalesWithParamsUseCase = makeFindAllSalesWithParamsUseCase;
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const find_all_with_params_1 = require("../../sales/find-all-with-params");
function makeFindAllSalesWithParamsUseCase() {
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    return new find_all_with_params_1.FindAllSalesWithParamsUseCase(salesRepo);
}
