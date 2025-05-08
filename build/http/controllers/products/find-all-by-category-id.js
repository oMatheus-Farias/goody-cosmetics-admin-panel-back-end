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
exports.findAllProductsByCategoryIdController = findAllProductsByCategoryIdController;
const errors_1 = require("../../../errors");
const products_schemas_1 = require("../../../libs/zod-schemas/products-schemas");
const make_find_all_products_by_category_id_use_case_1 = require("../../../use-cases/_factories/products/make-find-all-products-by-category-id-use-case");
function findAllProductsByCategoryIdController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = request.query;
            const { ordenation } = request.query;
            yield products_schemas_1.findAllProductsByCategoryIdSchema.parseAsync({
                categoryId,
                ordenation,
            });
            const findAllProductsByCategoryIdUseCase = (0, make_find_all_products_by_category_id_use_case_1.makeFindAllProductsByCategoryIdUseCase)();
            const products = yield findAllProductsByCategoryIdUseCase.execute(categoryId, ordenation);
            return reply.status(200).send(products);
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            throw error;
        }
    });
}
