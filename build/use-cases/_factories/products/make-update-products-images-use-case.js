"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateProductsImagesUseCase = makeUpdateProductsImagesUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const update_images_1 = require("../../products/update-images");
function makeUpdateProductsImagesUseCase() {
    const productsRepo = new prisma_1.PrismaProductsRepository();
    return new update_images_1.UpdateProductsImagesUseCase(productsRepo);
}
