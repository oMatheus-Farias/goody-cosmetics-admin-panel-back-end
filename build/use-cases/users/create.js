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
exports.CreateUsersUseCase = void 0;
const errors_1 = require("../../errors");
const mail_1 = require("../../libs/nodemailer/config/mail");
class CreateUsersUseCase {
    constructor(usersRepo, passwordHasher) {
        this.usersRepo = usersRepo;
        this.passwordHasher = passwordHasher;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [emailAlreadyExists, namesAlreadyExists] = yield Promise.all([
                this.usersRepo.findByEmail(data.email),
                this.usersRepo.findByNames(data.firstName, data.lastName),
            ]);
            if (emailAlreadyExists || namesAlreadyExists) {
                throw new errors_1.AlreadyExistsError('User already exists, verify the email or names');
            }
            yield (0, mail_1.sendEmail)(data.firstName, data.email, data.password, null);
            const firstPasswordHashed = yield this.passwordHasher.hash(data.password);
            yield this.usersRepo.create(Object.assign(Object.assign({}, data), { password: firstPasswordHashed }));
        });
    }
}
exports.CreateUsersUseCase = CreateUsersUseCase;
