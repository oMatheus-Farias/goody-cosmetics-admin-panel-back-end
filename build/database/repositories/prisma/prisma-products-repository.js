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
exports.PrismaProductsRepository = void 0;
const app_1 = require("../../../app");
class PrismaProductsRepository {
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.product.findUnique({
                where: { id: productId },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    currentPrice: true,
                    oldPrice: true,
                    stockQuantity: true,
                    createdAt: true,
                    categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    productImage: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            });
        });
    }
    findByName(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.product.findUnique({
                where: { name: productName },
                select: { id: true },
            });
        });
    }
    findAll(ordernation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    currentPrice: true,
                    oldPrice: true,
                    stockQuantity: true,
                    createdAt: true,
                    categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    productImage: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
                orderBy: ordernation
                    ? ordernation === 'A-Z' || ordernation === 'Z-A'
                        ? { name: ordernation === 'A-Z' ? 'asc' : 'desc' }
                        : { currentPrice: ordernation === 'LOWER_PRICE' ? 'asc' : 'desc' }
                    : { name: 'asc' },
            });
        });
    }
    findAllByCategory(categoryId, ordernation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.product.findMany({
                where: categoryId
                    ? {
                        categories: {
                            id: categoryId,
                        },
                    }
                    : {},
                select: {
                    id: true,
                    name: true,
                    description: true,
                    currentPrice: true,
                    oldPrice: true,
                    stockQuantity: true,
                    createdAt: true,
                    categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    productImage: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
                orderBy: ordernation
                    ? ordernation === 'A-Z' || ordernation === 'Z-A'
                        ? { name: ordernation === 'A-Z' ? 'asc' : 'desc' }
                        : { currentPrice: ordernation === 'LOWER_PRICE' ? 'asc' : 'desc' }
                    : { name: 'asc' },
            });
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield app_1.prisma.product.findMany({
                skip: page * 10,
                take: 10,
                orderBy: { name: 'asc' },
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    currentPrice: true,
                    oldPrice: true,
                    stockQuantity: true,
                    createdAt: true,
                    categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    productImage: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                },
            });
            const count = yield app_1.prisma.product.count({
                skip: page * 10,
                take: 10,
                where: {
                    name: {
                        contains: searchTerm,
                    },
                },
            });
            const totalCount = yield app_1.prisma.product.count({
                where: {
                    name: {
                        contains: searchTerm,
                    },
                },
            });
            return {
                products,
                meta: {
                    pageIndex: page,
                    limit: 10,
                    countPerPage: count,
                    totalCount,
                },
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.product.create({
                data,
                select: { id: true },
            });
        });
    }
    update(productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.product.update({
                where: { id: productId },
                data,
            });
        });
    }
    delete(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.product.delete({
                where: { id: productId },
            });
        });
    }
    findImagesById(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.productImage.findUnique({
                where: { id: imageId },
                select: { id: true },
            });
        });
    }
    createImages(productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.productImage.createMany({
                data: data.imageUrls.map((imageUrl) => ({
                    url: imageUrl,
                    productId,
                })),
            });
        });
    }
    updateImages(imageId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.productImage.updateMany({
                where: { id: imageId },
                data: {
                    url: imageUrl,
                },
            });
        });
    }
    deleteImages(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.productImage.deleteMany({
                where: { productId },
            });
        });
    }
}
exports.PrismaProductsRepository = PrismaProductsRepository;
