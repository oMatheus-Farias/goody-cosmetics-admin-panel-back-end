"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllUsersWithParamsUseCase = makeFindAllUsersWithParamsUseCase;
const prisma_1 = require("../../../database/repositories/prisma");
const find_all_with_params_1 = require("../../users/find-all-with-params");
function makeFindAllUsersWithParamsUseCase() {
    const usersRepo = new prisma_1.PrismaUsersRepository();
    return new find_all_with_params_1.FindAllUsersWithParamsUseCase(usersRepo);
}
