"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeForgotPasswordUseCase = makeForgotPasswordUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const forgot_password_1 = require("../../users/forgot-password");
function makeForgotPasswordUseCase() {
    const userRepo = new prisma_1.PrismaUsersRepository();
    return new forgot_password_1.ForgotPasswordUseCase(userRepo);
}
