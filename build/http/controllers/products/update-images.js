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
exports.updateProductsImagesController = updateProductsImagesController;
const errors_1 = require("../../../errors");
const process_file_1 = require("../../../functions/process-file");
const products_schemas_1 = require("../../../libs/zod-schemas/products-schemas");
const make_update_products_images_use_case_1 = require("../../../use-cases/_factories/products/make-update-products-images-use-case");
function updateProductsImagesController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { imageId } = request.params;
            const formData = (yield request.formData());
            const productImage = formData.get('productImage');
            yield products_schemas_1.updateProductsImagesSchema.parseAsync({
                imageId,
                productImage,
            });
            const imageFile = yield (0, process_file_1.processFile)(productImage);
            const updateProductsImagesUseCase = (0, make_update_products_images_use_case_1.makeUpdateProductsImagesUseCase)();
            yield updateProductsImagesUseCase.execute(imageId, imageFile);
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            throw error;
        }
    });
}
