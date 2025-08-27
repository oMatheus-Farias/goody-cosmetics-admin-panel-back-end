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
exports.DeleteProductsUseCase = void 0;
const errors_1 = require("../../errors");
class DeleteProductsUseCase {
    constructor(productsRepo, salesRepo) {
        this.productsRepo = productsRepo;
        this.salesRepo = salesRepo;
    }
    execute(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productsRepo.findById(productId);
            if (!product) {
                throw new errors_1.NotFoundError('Product not found');
            }
            const sales = yield this.salesRepo.findByProductId(productId);
            if (sales) {
                throw new errors_1.ConflictError('Product has associated sales and cannot be deleted');
            }
            yield Promise.all([
                this.productsRepo.deleteImages(product.id),
                this.productsRepo.delete(product.id),
            ]);
        });
    }
}
exports.DeleteProductsUseCase = DeleteProductsUseCase;
