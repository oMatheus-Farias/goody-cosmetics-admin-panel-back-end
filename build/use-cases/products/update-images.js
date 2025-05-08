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
exports.UpdateProductsImagesUseCase = void 0;
const server_1 = require("uploadthing/server");
const errors_1 = require("../../errors");
class UpdateProductsImagesUseCase {
    constructor(productsRepo) {
        this.productsRepo = productsRepo;
    }
    execute(imageId, imageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const image = yield this.productsRepo.findImagesById(imageId);
            if (!image) {
                throw new errors_1.NotFoundError('Image not found');
            }
            const utapi = new server_1.UTApi();
            const upload = utapi.uploadFiles(imageFile);
            const imageUrl = (_a = (yield upload).data) === null || _a === void 0 ? void 0 : _a.ufsUrl;
            yield this.productsRepo.updateImages(imageId, imageUrl);
        });
    }
}
exports.UpdateProductsImagesUseCase = UpdateProductsImagesUseCase;
