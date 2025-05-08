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
exports.CreateProductsUseCase = void 0;
const server_1 = require("uploadthing/server");
const errors_1 = require("../../errors");
class CreateProductsUseCase {
    constructor(productsRepo, categoriesRepo) {
        this.productsRepo = productsRepo;
        this.categoriesRepo = categoriesRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const product = yield this.productsRepo.findByName(data.name);
            if (product) {
                throw new errors_1.AlreadyExistsError('Product already exists');
            }
            const category = yield this.categoriesRepo.findById(data.categoryId);
            if (!category) {
                throw new errors_1.NotFoundError('Category not found');
            }
            const createdProductData = {
                name: data.name,
                description: data.description,
                categories: {
                    connect: {
                        id: data.categoryId,
                    },
                },
                oldPrice: data.oldPrice,
                currentPrice: data.currentPrice,
                stockQuantity: data.stockQuantity,
            };
            const utapi = new server_1.UTApi();
            const uploads = yield Promise.all(data.imageFiles.map((file) => utapi.uploadFiles(file)));
            const imageUrls = [];
            for (let i = 0; i < uploads.length; i++) {
                imageUrls.push((_a = uploads[i].data) === null || _a === void 0 ? void 0 : _a.ufsUrl);
            }
            yield this.productsRepo
                .create(createdProductData)
                .then((product) => __awaiter(this, void 0, void 0, function* () {
                yield this.productsRepo.createImages(product.id, { imageUrls });
            }))
                .catch(() => {
                throw new errors_1.ConflictError('Error creating product');
            });
        });
    }
}
exports.CreateProductsUseCase = CreateProductsUseCase;
