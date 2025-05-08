"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResetPasswordUseCase = makeResetPasswordUseCase;
const adapters_1 = require("../../../adapters");
const prisma_1 = require("../../../database/repositories/prisma");
const reset_password_1 = require("../../users/reset-password");
function makeResetPasswordUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    const passwordHasher = new adapters_1.PasswordHasherAdapter();
    return new reset_password_1.ResetPasswordUseCase(usersRepo, passwordHasher);
}
