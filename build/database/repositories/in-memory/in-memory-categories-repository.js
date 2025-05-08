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
exports.InMemoryCategoriesRepository = void 0;
class InMemoryCategoriesRepository {
    constructor() {
        this.items = [];
    }
    findById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.items.find((category) => category.id === categoryId);
            return category || null;
        });
    }
    findByName(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.items.find((category) => category.name === categoryName);
            return category || null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items || null;
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = searchTerm
                ? this.items.filter((category) => category.name.includes(searchTerm))
                : this.items;
            const count = categories.length;
            const totalCount = this.items.length;
            return {
                categories,
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
            this.items.push(data);
        });
    }
    update(categoryId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.items.find((category) => category.id === categoryId);
            if (!category) {
                throw new Error('Category not found');
            }
            if (data.name) {
                category.name = data.name;
            }
        });
    }
    delete(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryIndex = this.items.findIndex((category) => category.id === categoryId);
            if (categoryIndex === -1) {
                throw new Error('Category not found');
            }
            this.items.splice(categoryIndex, 1);
        });
    }
}
exports.InMemoryCategoriesRepository = InMemoryCategoriesRepository;
