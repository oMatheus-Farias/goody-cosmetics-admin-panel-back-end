"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignOutUsersUseCase = makeSignOutUsersUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const sign_out_users_1 = require("../../sessions/sign-out-users");
function makeSignOutUsersUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    const refreshTokensRepo = new prisma_1.PrismaRefreshTokensRepository();
    return new sign_out_users_1.SignOutUsersUseCase(usersRepo, refreshTokensRepo);
}
