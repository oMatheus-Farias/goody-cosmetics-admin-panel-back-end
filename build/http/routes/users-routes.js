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
exports.usersRoutes = usersRoutes;
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
function usersRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/me', { onRequest: [middlewares_1.verifyJwt] }, users_1.findByIdUserController);
        app.get('/params', { onRequest: [middlewares_1.verifyJwt, middlewares_1.verifyIfUserRoot] }, users_1.findAllWithParamsController);
        app.post('/', { onRequest: [middlewares_1.verifyJwt, middlewares_1.verifyIfUserRoot] }, users_1.createUsersController);
        app.post('/forgot-password', users_1.forgotPasswordController);
        app.patch('/:userId', { onRequest: [middlewares_1.verifyJwt, middlewares_1.verifyIfUserRoot] }, users_1.updateUsersController);
        app.patch('/reset-password', users_1.resetPasswordController);
        app.put('/', { onRequest: [middlewares_1.verifyJwt] }, users_1.updatePasswordController);
        app.delete('/:userId', { onRequest: [middlewares_1.verifyJwt, middlewares_1.verifyIfUserRoot] }, users_1.deleteUsersController);
    });
}
