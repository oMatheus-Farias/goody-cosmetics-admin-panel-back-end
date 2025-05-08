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
exports.ResetPasswordUseCase = void 0;
const errors_1 = require("../../errors");
class ResetPasswordUseCase {
    constructor(usersRepo, passwordHasher) {
        this.usersRepo = usersRepo;
        this.passwordHasher = passwordHasher;
    }
    execute(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findByResetToken(token);
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            const now = new Date();
            if (now > user.resetTokenExpiresAt) {
                yield this.usersRepo.setNullResetToken(user.id);
                throw new errors_1.CredentialsError('Token expired');
            }
            yield this.usersRepo.setNullResetToken(user.id);
            const hashedNewPassword = yield this.passwordHasher.hash(newPassword);
            yield this.usersRepo.updatePassword(user.id, hashedNewPassword);
        });
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
