"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateRefreshTokensUseCase = makeCreateRefreshTokensUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const create_1 = require("../../refresh-tokens/create");
function makeCreateRefreshTokensUseCase() {
    const refreshTokensRepo = new prisma_1.PrismaRefreshTokensRepository();
    const usersRepo = new prisma_1.PrismaUsersRepository();
    return new create_1.CreateRefreshTokensUseCase(refreshTokensRepo, usersRepo);
}
