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
exports.createRefreshTokensController = createRefreshTokensController;
const errors_1 = require("../../../errors");
const refresh_tokens_schema_1 = require("../../../libs/zod-schemas/refresh-tokens-schema");
const make_create_refresh_tokens_use_case_1 = require("../../../use-cases/_factories/refresh-tokens/make-create-refresh-tokens-use-case");
function createRefreshTokensController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { refreshTokenId } = request.body;
            yield refresh_tokens_schema_1.refreshTokensSchema.parseAsync({ refreshTokenId });
            const createRefreshTokensUseCase = (0, make_create_refresh_tokens_use_case_1.makeCreateRefreshTokensUseCase)();
            const { refreshToken, user } = yield createRefreshTokensUseCase.execute(refreshTokenId);
            const token = yield reply.jwtSign({
                role: user.role,
            }, {
                sign: {
                    sub: user.id,
                    expiresIn: '1h',
                },
            });
            return reply.status(201).send({
                refreshToken,
                token,
            });
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            if (error instanceof errors_1.CredentialsError) {
                return reply.status(401).send({ error: error.message });
            }
            throw error;
        }
    });
}
