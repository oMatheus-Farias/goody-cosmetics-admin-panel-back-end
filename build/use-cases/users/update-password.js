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
exports.UpdatePasswordUseCase = void 0;
const errors_1 = require("../../errors");
class UpdatePasswordUseCase {
    constructor(userRepo, passwordCompare, passwordHasher) {
        this.userRepo = userRepo;
        this.passwordCompare = passwordCompare;
        this.passwordHasher = passwordHasher;
    }
    execute(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByIdWithReturnedPassword(userId);
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            const isPasswordValid = yield this.passwordCompare.compare(oldPassword, user.passwordHash);
            if (!isPasswordValid) {
                throw new errors_1.CredentialsError('Invalid password');
            }
            const hashedNewPassword = yield this.passwordHasher.hash(newPassword);
            yield this.userRepo.updatePassword(userId, hashedNewPassword);
        });
    }
}
exports.UpdatePasswordUseCase = UpdatePasswordUseCase;
