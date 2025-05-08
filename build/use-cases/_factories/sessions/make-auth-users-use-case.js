"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthUsersUseCase = makeAuthUsersUseCase;
const password_compare_adapter_1 = require("../../../adapters/password-compare-adapter");
const prisma_1 = require("../../../database/repositories/prisma");
const auth_users_1 = require("../../sessions/auth-users");
function makeAuthUsersUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    const refreshTokensRepo = new prisma_1.PrismaRefreshTokensRepository();
    const passwordCompare = new password_compare_adapter_1.PasswordCompareAdapter();
    return new auth_users_1.AuthUsersUseCase(usersRepo, refreshTokensRepo, passwordCompare);
}
