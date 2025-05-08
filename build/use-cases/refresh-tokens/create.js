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
exports.CreateRefreshTokensUseCase = void 0;
const exp_time_in_hours_1 = require("../../constants/exp-time-in-hours");
const errors_1 = require("../../errors");
class CreateRefreshTokensUseCase {
    constructor(refreshTokensRepo, usersRepo) {
        this.refreshTokensRepo = refreshTokensRepo;
        this.usersRepo = usersRepo;
    }
    execute(refreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield this.refreshTokensRepo.findById(refreshTokenId);
            if (!refreshToken) {
                throw new errors_1.NotFoundError('Refresh token not found');
            }
            if (Date.now() > refreshToken.expiresAt.getTime()) {
                yield this.refreshTokensRepo.deleteAll(refreshToken.userId);
                throw new errors_1.CredentialsError('Refresh token expired.');
            }
            yield this.refreshTokensRepo.deleteAll(refreshToken.userId);
            const user = yield this.usersRepo.findById(refreshToken.userId);
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            const expiresAtRefreshToken = new Date();
            expiresAtRefreshToken.setHours(expiresAtRefreshToken.getHours() + exp_time_in_hours_1.EXP_TIME_IN_HOURS);
            const { id: refreshTokeId } = yield this.refreshTokensRepo.create({
                user: { connect: { id: user.id } },
                expiresAt: expiresAtRefreshToken,
            });
            return {
                refreshToken: refreshTokeId,
                user,
            };
        });
    }
}
exports.CreateRefreshTokensUseCase = CreateRefreshTokensUseCase;
