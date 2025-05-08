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
exports.signOutUsersController = signOutUsersController;
const errors_1 = require("../../../errors");
const auth_users_schemas_1 = require("../../../libs/zod-schemas/auth-users-schemas");
const make_sign_out_users_use_case_1 = require("../../../use-cases/_factories/sessions/make-sign-out-users-use-case");
function signOutUsersController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sub: userId } = request.user;
            yield auth_users_schemas_1.signOutUsersSchema.parseAsync({
                userId,
            });
            const signOutUsersUseCase = (0, make_sign_out_users_use_case_1.makeSignOutUsersUseCase)();
            yield signOutUsersUseCase.execute(userId);
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            throw error;
        }
    });
}
