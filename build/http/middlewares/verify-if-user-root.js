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
exports.verifyIfUserRoot = verifyIfUserRoot;
function verifyIfUserRoot(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { role } = (yield request.jwtVerify());
            if (role !== 'ROOT') {
                return reply.status(403).send({ error: 'Forbidden' });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }
        }
    });
}
