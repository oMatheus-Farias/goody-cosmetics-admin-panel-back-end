"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindByIdUserUseCase = makeFindByIdUserUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_by_id_1 = require("../../users/find-by-id");
function makeFindByIdUserUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    return new find_by_id_1.FindByIdUserUseCase(usersRepo);
}
