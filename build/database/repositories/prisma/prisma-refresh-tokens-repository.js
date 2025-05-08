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
exports.PrismaRefreshTokensRepository = void 0;
const app_1 = require("../../../app");
class PrismaRefreshTokensRepository {
    findById(refreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.refreshToken.findUnique({
                where: {
                    id: refreshTokenId,
                },
                select: {
                    id: true,
                    userId: true,
                    expiresAt: true,
                },
            });
        });
    }
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield app_1.prisma.refreshToken.findMany({
                where: {
                    userId,
                },
                select: {
                    id: true,
                    userId: true,
                    expiresAt: true,
                },
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = yield app_1.prisma.refreshToken.create({
                data,
                select: {
                    id: true,
                },
            });
            return { id };
        });
    }
    deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield app_1.prisma.refreshToken.deleteMany({
                where: {
                    userId,
                },
            });
        });
    }
}
exports.PrismaRefreshTokensRepository = PrismaRefreshTokensRepository;
