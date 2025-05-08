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
exports.forgotPasswordController = forgotPasswordController;
const node_crypto_1 = require("node:crypto");
const errors_1 = require("../../../errors");
const users_schemas_1 = require("../../../libs/zod-schemas/users-schemas");
const make_forgot_password_use_case_1 = require("../../../use-cases/_factories/users/make-forgot-password-use-case");
function forgotPasswordController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = request.body;
            yield users_schemas_1.forgotPasswordSchema.parseAsync({
                email,
            });
            const resetToken = (0, node_crypto_1.randomBytes)(20).toString('hex');
            const resetTokenExpiresAt = new Date();
            const aditionalHours = 1;
            resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + aditionalHours);
            const forgotPasswordUseCase = (0, make_forgot_password_use_case_1.makeForgotPasswordUseCase)();
            yield forgotPasswordUseCase.execute(email, resetToken, resetTokenExpiresAt);
            return reply.status(200).send({
                message: 'Email sent successfully',
            });
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(409).send({ error: error.message });
            }
            throw error;
        }
    });
}
