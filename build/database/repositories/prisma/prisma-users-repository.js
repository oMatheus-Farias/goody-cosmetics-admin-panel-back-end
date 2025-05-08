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
exports.PrismaUsersRepository = void 0;
const app_1 = require("../../../app");
class PrismaUsersRepository {
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                },
            });
        });
    }
    findByIdWithReturnedPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    passwordHash: true,
                },
            });
        });
    }
    findByNames(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.user.findFirst({
                where: {
                    firstName,
                    lastName,
                },
                select: {
                    id: true,
                    email: true,
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
        });
    }
    findByResetToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.user.findUnique({
                where: {
                    resetToken,
                },
            });
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield app_1.prisma.user.findMany({
                skip: page * 10,
                take: 10,
                orderBy: { firstName: 'asc' },
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: searchTerm,
                                mode: 'insensitive',
                            },
                        },
                        {
                            lastName: {
                                contains: searchTerm,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true,
                },
            });
            const count = yield app_1.prisma.user.count({
                skip: page * 10,
                take: 10,
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: searchTerm,
                            },
                        },
                        {
                            lastName: {
                                contains: searchTerm,
                            },
                        },
                    ],
                },
            });
            const totalCount = yield app_1.prisma.user.count({
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: searchTerm,
                            },
                        },
                        {
                            lastName: {
                                contains: searchTerm,
                            },
                        },
                    ],
                },
            });
            return {
                users,
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
            yield app_1.prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    passwordHash: data.password,
                    role: data === null || data === void 0 ? void 0 : data.role,
                },
            });
        });
    }
    update(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data,
            });
        });
    }
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    passwordHash: newPassword,
                },
            });
        });
    }
    forgotPassword(userId, resetToken, resetTokenExpiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    resetToken,
                    resetTokenExpiresAt,
                },
            });
        });
    }
    resetPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    passwordHash: newPassword,
                    resetToken: null,
                    resetTokenExpiresAt: null,
                },
            });
        });
    }
    setNullResetToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    resetToken: null,
                    resetTokenExpiresAt: null,
                },
            });
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        });
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
