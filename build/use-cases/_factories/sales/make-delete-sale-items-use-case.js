"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteSaleItemsUseCase = makeDeleteSaleItemsUseCase;
const prisma_sales_repository_1 = require("../../../database/repositories/prisma/prisma-sales-repository");
const delete_sale_items_1 = require("../../sales/delete-sale-items");
function makeDeleteSaleItemsUseCase() {
    const salesRepo = new prisma_sales_repository_1.PrismaSalesRepository();
    return new delete_sale_items_1.DeleteSaleItemsUseCase(salesRepo);
}
