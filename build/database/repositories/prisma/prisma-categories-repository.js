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
exports.PrismaCategoriesRepository = void 0;
const app_1 = require("../../../app");
class PrismaCategoriesRepository {
    findById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.category.findUnique({
                where: { id: categoryId },
                select: { id: true, name: true },
            });
        });
    }
    findByName(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.category.findUnique({
                where: { name: categoryName },
                select: { id: true, name: true },
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.category.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' },
            });
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield app_1.prisma.category.findMany({
                skip: page * 10,
                take: 10,
                orderBy: { name: 'asc' },
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            });
            const count = yield app_1.prisma.category.count({
                skip: page * 10,
                take: 10,
                where: {
                    name: {
                        contains: searchTerm,
                    },
                },
            });
            const totalCount = yield app_1.prisma.category.count({
                where: {
                    name: {
                        contains: searchTerm,
                    },
                },
            });
            return {
                categories,
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
            yield app_1.prisma.category.create({ data });
        });
    }
    update(categoryId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.category.update({ where: { id: categoryId }, data });
        });
    }
    delete(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.category.delete({ where: { id: categoryId } });
        });
    }
}
exports.PrismaCategoriesRepository = PrismaCategoriesRepository;
