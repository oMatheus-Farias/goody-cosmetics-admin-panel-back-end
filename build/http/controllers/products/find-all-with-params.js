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
exports.findAllProductsWithParamsController = findAllProductsWithParamsController;
const env_1 = require("../../../configs/env");
const products_schemas_1 = require("../../../libs/zod-schemas/products-schemas");
const make_find_all_products_with_params_use_case_1 = require("../../../use-cases/_factories/products/make-find-all-products-with-params-use-case");
function findAllProductsWithParamsController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pageIndex, searchTerm } = request.query;
            const page = Number(pageIndex) || 0;
            yield products_schemas_1.findAllProductsWithParamsSchema.parseAsync({
                page,
                searchTerm,
            });
            const findAllProductsWithParamsUseCase = (0, make_find_all_products_with_params_use_case_1.makeFindAllProductsWithParamsUseCase)();
            const products = yield findAllProductsWithParamsUseCase.execute(page, searchTerm);
            return reply.status(200).send(products);
        }
        catch (error) {
            if (env_1.env.NODE_ENV === 'development') {
                console.error(error);
            }
            throw error;
        }
    });
}
