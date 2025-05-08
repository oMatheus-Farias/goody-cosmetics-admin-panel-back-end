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
exports.authUsersController = authUsersController;
const credentials_error_1 = require("../../../errors/credentials-error");
const auth_users_schemas_1 = require("../../../libs/zod-schemas/auth-users-schemas");
const make_auth_users_use_case_1 = require("../../../use-cases/_factories/sessions/make-auth-users-use-case");
function authUsersController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = request.body;
            yield auth_users_schemas_1.authUsersSchema.parseAsync(data);
            const authUsersUseCase = (0, make_auth_users_use_case_1.makeAuthUsersUseCase)();
            const user = yield authUsersUseCase.execute(data);
            const token = yield reply.jwtSign({
                role: user.role,
            }, {
                sign: {
                    sub: user.id,
                    expiresIn: '1h',
                },
            });
            return reply.status(200).send({
                token,
                refreshToken: user.refreshToken,
            });
        }
        catch (error) {
            if (error instanceof credentials_error_1.CredentialsError) {
                return reply.status(401).send({ error: error.message });
            }
            throw error;
        }
    });
}
