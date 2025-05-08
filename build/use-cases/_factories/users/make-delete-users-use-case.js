"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteUsersUseCase = makeDeleteUsersUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const delete_1 = require("../../users/delete");
function makeDeleteUsersUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    return new delete_1.DeleteUsersUseCase(usersRepo);
}
