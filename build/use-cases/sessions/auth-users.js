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
exports.AuthUsersUseCase = void 0;
const exp_time_in_hours_1 = require("../../constants/exp-time-in-hours");
const errors_1 = require("../../errors");
class AuthUsersUseCase {
    constructor(usersRepo, refreshTokensRepo, passwordCompare) {
        this.usersRepo = usersRepo;
        this.refreshTokensRepo = refreshTokensRepo;
        this.passwordCompare = passwordCompare;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findByEmail(data.email);
            if (!user) {
                throw new errors_1.CredentialsError();
            }
            const thePasswordsMatch = yield this.passwordCompare.compare(data.password, user.passwordHash);
            if (!thePasswordsMatch) {
                throw new errors_1.CredentialsError();
            }
            const refreshTokens = yield this.refreshTokensRepo.findAllByUserId(user.id);
            const refreshTokensExists = refreshTokens.length > 0;
            if (refreshTokensExists) {
                yield this.refreshTokensRepo.deleteAll(user.id);
            }
            const expiresAtRefreshToken = new Date();
            expiresAtRefreshToken.setHours(expiresAtRefreshToken.getHours() + exp_time_in_hours_1.EXP_TIME_IN_HOURS);
            const { id: refreshToken } = yield this.refreshTokensRepo.create({
                user: { connect: { id: user.id } },
                expiresAt: expiresAtRefreshToken,
            });
            const userData = {
                id: user.id,
                role: user.role,
                refreshToken,
            };
            return userData;
        });
    }
}
exports.AuthUsersUseCase = AuthUsersUseCase;
