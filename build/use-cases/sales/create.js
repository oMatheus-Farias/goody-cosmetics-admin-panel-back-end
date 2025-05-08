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
exports.CreateSalesUseCase = void 0;
const errors_1 = require("../../errors");
class CreateSalesUseCase {
    constructor(salesRepo, productsRepo) {
        this.salesRepo = salesRepo;
        this.productsRepo = productsRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < data.items.length; i++) {
                const product = yield this.productsRepo.findById(data.items[i].productId);
                if (!product) {
                    throw new errors_1.NotFoundError('Product not found');
                }
            }
            const sale = yield this.salesRepo.create(data);
            return { id: sale.id };
        });
    }
}
exports.CreateSalesUseCase = CreateSalesUseCase;
