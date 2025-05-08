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
exports.UpdateSalesUseCase = void 0;
const errors_1 = require("../../errors");
class UpdateSalesUseCase {
    constructor(salesRepo) {
        this.salesRepo = salesRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const sale = yield this.salesRepo.findById(data.saleId);
            if (!sale) {
                throw new errors_1.NotFoundError('Sale not found');
            }
            if (data.items && ((_a = data.items) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                for (let i = 0; i < data.items.length; i++) {
                    const saleItem = yield this.salesRepo.findSalesItemsById(data.items[i].saleItemId);
                    if (!saleItem) {
                        throw new errors_1.NotFoundError('Sale Item not found');
                    }
                }
            }
            yield this.salesRepo.update(data);
        });
    }
}
exports.UpdateSalesUseCase = UpdateSalesUseCase;
