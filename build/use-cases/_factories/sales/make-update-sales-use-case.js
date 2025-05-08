"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateSalesUseCase = makeUpdateSalesUseCase;
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const update_1 = require("../../sales/update");
function makeUpdateSalesUseCase() {
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    return new update_1.UpdateSalesUseCase(salesRepo);
}
