"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePasswordUseCase = makeUpdatePasswordUseCase;
const adapters_1 = require("../../../adapters");
const prisma_1 = require("../../../database/repositories/prisma");
const update_password_1 = require("../../users/update-password");
function makeUpdatePasswordUseCase() {
    const userRepo = new prisma_1.PrismaUsersRepository();
    const passwordCompare = new adapters_1.PasswordCompareAdapter();
    const passwordHasher = new adapters_1.PasswordHasherAdapter();
    return new update_password_1.UpdatePasswordUseCase(userRepo, passwordCompare, passwordHasher);
}
