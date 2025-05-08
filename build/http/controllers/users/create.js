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
exports.createUsersController = createUsersController;
const errors_1 = require("../../../errors");
const random_password_generator_1 = require("../../../functions/random-password-generator");
const users_schemas_1 = require("../../../libs/zod-schemas/users-schemas");
const make_create_users_use_case_1 = require("../../../use-cases/_factories/users/make-create-users-use-case");
function createUsersController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = request.body;
            yield users_schemas_1.usersSchema.parseAsync(data);
            const createUsersUseCase = (0, make_create_users_use_case_1.makeCreateUsersUseCase)();
            const firstPassword = yield (0, random_password_generator_1.randomPasswordGenerator)();
            yield createUsersUseCase.execute(Object.assign(Object.assign({}, data), { password: firstPassword }));
            return reply.status(201).send({ message: 'User created' });
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyExistsError) {
                return reply.status(409).send({ error: error.message });
            }
            if (error instanceof errors_1.WrongPasswordLengthError) {
                return reply.status(409).send({ error: error.message });
            }
            throw error;
        }
    });
}
