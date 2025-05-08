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
exports.InMemoryRefreshTokensRepository = void 0;
class InMemoryRefreshTokensRepository {
    constructor() {
        this.items = [];
    }
    findById(refreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = this.items.find((refreshToken) => refreshToken.id === refreshTokenId);
            if (!refreshToken) {
                return null;
            }
            const refreshTokenData = {
                id: refreshToken.id,
                userId: refreshToken.userId,
                expiresAt: refreshToken.expiresAt,
            };
            return refreshTokenData;
        });
    }
    findAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokens = this.items.filter((refreshToken) => refreshToken.userId === userId);
            if (!refreshTokens.length) {
                return [];
            }
            const refreshTokensData = refreshTokens.map((refreshToken) => ({
                id: refreshToken.id,
                userId: refreshToken.userId,
                expiresAt: refreshToken.expiresAt,
            }));
            return refreshTokensData;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const refreshToken = {
                id: crypto.randomUUID(),
                userId: (_a = data.user.connect) === null || _a === void 0 ? void 0 : _a.id,
                expiresAt: data.expiresAt,
                createdAt: new Date(),
            };
            this.items.push(refreshToken);
            return { id: refreshToken.id };
        });
    }
    deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.items = this.items.filter((refreshToken) => refreshToken.userId !== userId);
        });
    }
}
exports.InMemoryRefreshTokensRepository = InMemoryRefreshTokensRepository;
