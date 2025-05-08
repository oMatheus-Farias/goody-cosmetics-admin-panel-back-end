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
exports.updatePasswordController = updatePasswordController;
const errors_1 = require("../../../errors");
const users_schemas_1 = require("../../../libs/zod-schemas/users-schemas");
const make_update_password_use_case_1 = require("../../../use-cases/_factories/users/make-update-password-use-case");
function updatePasswordController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sub: userId } = request.user;
            const { oldPassword, newPassword } = request.body;
            yield users_schemas_1.updatePasswordSchema.parseAsync({
                userId,
                oldPassword,
                newPassword,
            });
            const updatePasswordUseCase = (0, make_update_password_use_case_1.makeUpdatePasswordUseCase)();
            yield updatePasswordUseCase.execute(userId, oldPassword, newPassword);
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(409).send({ error: error.message });
            }
            if (error instanceof errors_1.CredentialsError) {
                return reply.status(409).send({ error: error.message });
            }
            throw error;
        }
    });
}
