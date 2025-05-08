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
exports.ForgotPasswordUseCase = void 0;
const errors_1 = require("../../errors");
const mail_1 = require("../../libs/nodemailer/config/mail");
class ForgotPasswordUseCase {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    execute(email, resetToken, resetTokenExpiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findByEmail(email);
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            yield Promise.all([
                this.usersRepo.forgotPassword(user.id, resetToken, resetTokenExpiresAt),
                (0, mail_1.sendEmail)(user.firstName, user.email, null, resetToken, 'forgot-password'),
            ]);
        });
    }
}
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
