"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteSalesUseCase = makeDeleteSalesUseCase;
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const delete_1 = require("../../sales/delete");
function makeDeleteSalesUseCase() {
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    return new delete_1.DeleteSalesUseCase(salesRepo);
}
