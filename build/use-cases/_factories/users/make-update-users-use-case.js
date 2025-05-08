"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateUsersUseCase = makeUpdateUsersUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const update_1 = require("../../users/update");
function makeUpdateUsersUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    return new update_1.UpdateUsersUseCase(usersRepo);
}
