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
exports.UpdateUsersUseCase = void 0;
const errors_1 = require("../../errors");
class UpdateUsersUseCase {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    execute(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepo.findById(userId);
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            if (data.firstName && data.lastName) {
                const userWithSameNames = yield this.usersRepo.findByNames(data.firstName, data.lastName);
                if (userWithSameNames && userWithSameNames.id !== userId) {
                    throw new errors_1.AlreadyExistsError('User with same names already exists');
                }
            }
            yield this.usersRepo.update(userId, data);
        });
    }
}
exports.UpdateUsersUseCase = UpdateUsersUseCase;
