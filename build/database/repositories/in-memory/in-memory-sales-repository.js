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
exports.InMemorySalesRepository = void 0;
const node_crypto_1 = require("node:crypto");
class InMemorySalesRepository {
    constructor() {
        this.items = [];
    }
    findById(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items.find((sale) => sale.id === saleId) || null;
        });
    }
    findSalesItemsById(saleItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = this.items.find((sale) => sale.items.some((item) => item.saleItemId === saleItemId));
            if (!sale) {
                return null;
            }
            const saleItem = sale.items.find((item) => item.saleItemId === saleItemId) || null;
            return {
                id: saleItem === null || saleItem === void 0 ? void 0 : saleItem.saleItemId,
                saleId: sale.id,
                productId: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                quantity: saleItem === null || saleItem === void 0 ? void 0 : saleItem.quantity,
                unitPrice: saleItem === null || saleItem === void 0 ? void 0 : saleItem.unitPrice,
                createdAt: new Date(),
            };
        });
    }
    findSaleItemsBySaleId(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = this.items.find((sale) => sale.id === saleId);
            if (!sale) {
                return null;
            }
            return sale.items.map((item) => ({
                id: item.saleItemId,
                saleId: sale.id,
                productId: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                createdAt: new Date(),
            }));
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = searchTerm
                ? this.items.filter((sale) => sale.items.some((item) => item.productName.includes(searchTerm)))
                : this.items;
            return {
                sales,
                meta: {
                    pageIndex: page,
                    limit: 10,
                    countPerPage: 10,
                    totalCount: sales.length,
                },
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleItems = data.items.map((item) => ({
                saleItemId: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                productName: `Product-${item.productId}`,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
            }));
            const sale = {
                id: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                saleDate: data.saleDate,
                items: saleItems,
                totalPrice: 0,
            };
            this.items.push(sale);
            return { id: sale.id };
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = this.items.find((sale) => sale.id === data.saleId);
            if (!sale) {
                throw new Error('Sale not found');
            }
            if (data.saleDate) {
                sale.saleDate = data.saleDate;
            }
            if (data.items && data.items.length > 0) {
                for (let i = 0; i < data.items.length; i++) {
                    const saleItem = sale.items.find((item) => { var _a, _b; return item.saleItemId === ((_b = (_a = data.items) === null || _a === void 0 ? void 0 : _a[i]) === null || _b === void 0 ? void 0 : _b.saleItemId); });
                    if (!saleItem) {
                        throw new Error('Sale Item not found');
                    }
                    if (data.items[i].quantity) {
                        saleItem.quantity = data.items[i].quantity;
                    }
                    if (data.items[i].unitPrice) {
                        saleItem.unitPrice = data.items[i].unitPrice;
                    }
                }
            }
        });
    }
    deleteSaleItems(saleItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = this.items.find((sale) => sale.items.some((item) => item.saleItemId === saleItemId));
            if (!sale) {
                throw new Error('Sale not found');
            }
            sale.items = sale.items.filter((item) => item.saleItemId !== saleItemId);
        });
    }
    deleteSales(saleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.items = this.items.filter((sale) => sale.id !== saleId);
        });
    }
}
exports.InMemorySalesRepository = InMemorySalesRepository;
