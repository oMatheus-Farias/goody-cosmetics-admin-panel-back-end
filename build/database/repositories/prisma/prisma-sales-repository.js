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
exports.PrismaSalesRepository = void 0;
const app_1 = require("../../../app");
class PrismaSalesRepository {
    findById(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield app_1.prisma.sale.findUnique({
                where: {
                    id: saleId,
                },
                select: {
                    id: true,
                    saleDate: true,
                    saleItem: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!sale) {
                return null;
            }
            return {
                id: sale.id,
                saleDate: sale.saleDate,
                totalPrice: sale.saleItem.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
                items: sale.saleItem.map((item) => ({
                    saleItemId: item.id,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    productName: item.product.name,
                })),
            };
        });
    }
    findByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.saleItem.findFirst({
                where: {
                    productId,
                },
                select: {
                    id: true,
                },
            });
        });
    }
    findSalesItemsById(saleItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.saleItem.findUnique({
                where: {
                    id: saleItemId,
                },
            });
        });
    }
    findSaleItemsBySaleId(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.saleItem.findMany({
                where: {
                    saleId,
                },
            });
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = (yield app_1.prisma.sale.findMany({
                skip: page * 10,
                take: 10,
                select: {
                    id: true,
                    saleDate: true,
                    saleItem: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
                where: {
                    saleItem: {
                        some: {
                            product: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    saleDate: 'desc',
                },
            })).map((sale) => ({
                id: sale.id,
                saleDate: sale.saleDate,
                totalPrice: sale.saleItem.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
                items: sale.saleItem.map((item) => ({
                    saleItemId: item.id,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    productName: item.product.name,
                })),
            }));
            const count = yield app_1.prisma.sale.count({
                skip: page * 10,
                take: 10,
                where: {
                    saleItem: {
                        some: {
                            product: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                },
            });
            const totalCount = yield app_1.prisma.sale.count({
                where: {
                    saleItem: {
                        some: {
                            product: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                },
            });
            return {
                sales,
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
            return yield app_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const sale = yield tx.sale.create({
                    data: {
                        saleDate: data.saleDate,
                    },
                    select: {
                        id: true,
                    },
                });
                const items = data.items.map((item) => {
                    return tx.saleItem.create({
                        data: {
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            productId: item.productId,
                            saleId: sale.id,
                        },
                    });
                });
                yield Promise.all(items);
                return sale;
            }));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.sale.update({
                    where: {
                        id: data.saleId,
                    },
                    data: {
                        saleDate: data.saleDate,
                    },
                });
                if (data.items) {
                    const items = data.items.map((item) => {
                        return tx.saleItem.update({
                            where: {
                                id: item.saleItemId,
                                saleId: data.saleId,
                            },
                            data: {
                                quantity: item.quantity,
                                unitPrice: item.unitPrice,
                            },
                        });
                    });
                    yield Promise.all(items);
                }
            }));
        });
    }
    deleteSaleItems(saleItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.saleItem.delete({
                where: {
                    id: saleItemId,
                },
            });
        });
    }
    deleteSales(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.sale.delete({
                where: {
                    id: saleId,
                },
            });
        });
    }
}
exports.PrismaSalesRepository = PrismaSalesRepository;
