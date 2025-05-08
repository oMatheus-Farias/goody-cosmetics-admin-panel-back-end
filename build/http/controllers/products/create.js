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
exports.createProductsController = createProductsController;
const errors_1 = require("../../../errors");
const extract_create_products_form_data_1 = require("../../../functions/extract-create-products-form-data");
const process_file_1 = require("../../../functions/process-file");
const products_schemas_1 = require("../../../libs/zod-schemas/products-schemas");
const make_create_products_use_case_1 = require("../../../use-cases/_factories/products/make-create-products-use-case");
function createProductsController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formData = (yield request.formData());
            const formFields = (0, extract_create_products_form_data_1.extractCreateProductsFormData)(formData);
            yield products_schemas_1.createProductsSchema.parseAsync(Object.assign({}, formFields));
            const imageFiles = yield Promise.all([
                (0, process_file_1.processFile)(formFields.image01),
                (0, process_file_1.processFile)(formFields.image02),
            ]);
            const createProductsUseCase = (0, make_create_products_use_case_1.makeCreateProductsUseCase)();
            yield createProductsUseCase.execute({
                name: formFields.name,
                description: formFields.description,
                categoryId: formFields.categoryId,
                oldPrice: formFields.oldPrice,
                currentPrice: formFields.currentPrice,
                stockQuantity: formFields.stockQuantity,
                imageFiles,
            });
            return reply.status(201).send({ message: 'Product created' });
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyExistsError) {
                return reply.status(409).send({ error: error.message });
            }
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            if (error instanceof errors_1.ConflictError) {
                return reply.status(409).send({ error: error.message });
            }
            throw error;
        }
    });
}
