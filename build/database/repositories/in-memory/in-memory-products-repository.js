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
exports.InMemoryProductsRepository = void 0;
const node_crypto_1 = require("node:crypto");
class InMemoryProductsRepository {
    constructor() {
        this.items = [];
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.id === productId);
            return product || null;
        });
    }
    findByName(productName) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.name === productName);
            return product || null;
        });
    }
    findAll(ordernation) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = this.items;
            if (ordernation && ordernation === 'LOWER_PRICE') {
                return (products = this.items.sort((a, b) => a.currentPrice - b.currentPrice));
            }
            if (ordernation && ordernation === 'HIGHER_PRICE') {
                return (products = this.items.sort((a, b) => b.currentPrice - a.currentPrice));
            }
            return products;
        });
    }
    findAllByCategory(categoryId, ordernation) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = this.items.filter((product) => product.categories.id === categoryId);
            if (ordernation && ordernation === 'LOWER_PRICE') {
                return (products = products.sort((a, b) => a.currentPrice - b.currentPrice));
            }
            if (ordernation && ordernation === 'HIGHER_PRICE') {
                return (products = products.sort((a, b) => b.currentPrice - a.currentPrice));
            }
            return products;
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = searchTerm
                ? this.items.filter((product) => product.name.includes(searchTerm))
                : this.items;
            const count = products.length;
            const totalCount = this.items.length;
            return {
                products,
                meta: {
                    pageIndex: page,
                    limit: 10,
                    countPerPage: count,
                    totalCount: totalCount,
                },
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const product = {
                id: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                name: data.name,
                description: data.description,
                currentPrice: data.currentPrice,
                oldPrice: data.oldPrice,
                stockQuantity: data.stockQuantity,
                createdAt: new Date(),
                categories: {
                    id: (_a = data.categories.connect) === null || _a === void 0 ? void 0 : _a.id,
                    name: 'Category',
                },
                productImage: [
                    {
                        id: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                        url: 'http://example.com/image.jpg',
                    },
                ],
            };
            this.items.push(product);
            return { id: product.id };
        });
    }
    update(productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.id === productId);
            if (!product) {
                throw new Error('Product not found');
            }
            if (data.name) {
                product.name = data.name;
            }
            if (data.description) {
                product.description = data.description;
            }
            if (data.currentPrice) {
                product.currentPrice = data.currentPrice;
            }
            if (data.oldPrice) {
                product.oldPrice = data.oldPrice;
            }
            if (data.stockQuantity) {
                product.stockQuantity = data.stockQuantity;
            }
        });
    }
    delete(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.items.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error('Product not found');
            }
            this.items.splice(index, 1);
        });
    }
    findImagesById(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.productImage.find((image) => image.id === imageId));
            if (!product) {
                return null;
            }
            const image = product.productImage.find((image) => image.id === imageId);
            return image || null;
        });
    }
    createImages(productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.id === productId);
            if (!product) {
                throw new Error('Product not found');
            }
            data.imageUrls.forEach((imageUrl) => {
                product.productImage.push({
                    id: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                    url: imageUrl,
                });
            });
        });
    }
    updateImages(imageId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.productImage.find((image) => image.id === imageId));
            if (!product) {
                throw new Error('Product not found');
            }
            product.productImage.forEach((image) => {
                if (image.id === imageId) {
                    image.url = imageUrl;
                }
            });
        });
    }
    deleteImages(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.items.find((product) => product.id === productId);
            if (!product) {
                throw new Error('Product not found');
            }
            product.productImage = [];
        });
    }
}
exports.InMemoryProductsRepository = InMemoryProductsRepository;
