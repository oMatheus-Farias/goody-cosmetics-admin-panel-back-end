"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllWithParamsController = findAllWithParamsController;
const env_1 = require("../../../configs/env");
const users_schemas_1 = require("../../../libs/zod-schemas/users-schemas");
const make_find_all_users_with_params_use_case_1 = require("../../../use-cases/_factories/users/make-find-all-users-with-params-use-case");
function findAllWithParamsController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pageIndex, searchTerm } = request.query;
            const page = Number(pageIndex) || 0;
            yield users_schemas_1.findAllUsersWithParamsSchema.parseAsync({ page, searchTerm });
            const findAllUsersWithParamsUseCase = (0, make_find_all_users_with_params_use_case_1.makeFindAllUsersWithParamsUseCase)();
            const users = yield findAllUsersWithParamsUseCase.execute(page, searchTerm);
            return reply.status(200).send(users);
        }
        catch (error) {
            if (env_1.env.NODE_ENV === 'development') {
                console.error(error);
            }
            throw error;
        }
    });
}
