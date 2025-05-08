"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUsersUseCase = makeCreateUsersUseCase;
const password_hasher_adapter_1 = require("../../../adapters/password-hasher-adapter");
const prisma_1 = require("../../../database/repositories/prisma");
const create_1 = require("../../users/create");
function makeCreateUsersUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    const passwordHasher = new password_hasher_adapter_1.PasswordHasherAdapter();
    return new create_1.CreateUsersUseCase(usersRepo, passwordHasher);
}
