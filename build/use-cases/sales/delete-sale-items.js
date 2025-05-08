"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSaleItemsUseCase = void 0;
const errors_1 = require("../../errors");
class DeleteSaleItemsUseCase {
    constructor(salesRepo) {
        this.salesRepo = salesRepo;
    }
    execute(saleItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleItem = yield this.salesRepo.findSalesItemsById(saleItemId);
            if (!saleItem) {
                throw new errors_1.NotFoundError('Sale item not found');
            }
            yield this.salesRepo.deleteSaleItems(saleItemId);
        });
    }
}
exports.DeleteSaleItemsUseCase = DeleteSaleItemsUseCase;
