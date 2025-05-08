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
exports.sessionsRoutes = sessionsRoutes;
const sessions_1 = require("../controllers/sessions");
const middlewares_1 = require("../middlewares");
function sessionsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/authentication', sessions_1.authUsersController);
        app.delete('/sign-out', { onRequest: [middlewares_1.verifyJwt] }, sessions_1.signOutUsersController);
    });
}
