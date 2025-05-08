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
exports.resetPasswordController = resetPasswordController;
const errors_1 = require("../../../errors");
const users_schemas_1 = require("../../../libs/zod-schemas/users-schemas");
const make_reset_password_use_case_1 = require("../../../use-cases/_factories/users/make-reset-password-use-case");
function resetPasswordController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, newPassword } = request.body;
            yield users_schemas_1.resetPasswordSchema.parseAsync({
                token,
                newPassword,
            });
            const resetPasswordUseCase = (0, make_reset_password_use_case_1.makeResetPasswordUseCase)();
            yield resetPasswordUseCase.execute(token, newPassword);
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(409).send({ error: error.message });
            }
            if (error instanceof errors_1.CredentialsError) {
                return reply.status(401).send({ error: error.message });
            }
            throw error;
        }
    });
}
