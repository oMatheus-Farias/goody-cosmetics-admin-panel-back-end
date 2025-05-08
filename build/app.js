"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const cors_1 = require("@fastify/cors");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const fastify_2 = require("uploadthing/fastify");
const zod_1 = require("zod");
const env_1 = require("./configs/env");
const routes_1 = require("./http/routes");
const sales_routes_1 = require("./http/routes/sales-routes");
const config_uploadthing_1 = require("./libs/uploadthing/config-uploadthing");
exports.app = (0, fastify_1.default)();
exports.prisma = new client_1.PrismaClient();
exports.app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET,
});
exports.app.register(cors_1.fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
exports.app.register(multipart_1.default, {
    attachFieldsToBody: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB de limite
    },
});
exports.app.register(fastify_2.createRouteHandler, {
    router: config_uploadthing_1.uploadRouter,
    config: {
        token: env_1.env.UPLOADTHING_TOKEN,
        logLevel: 'None',
    },
});
exports.app.register(routes_1.usersRoutes, {
    prefix: '/api/users',
});
exports.app.register(routes_1.sessionsRoutes, {
    prefix: '/api/sessions',
});
exports.app.register(routes_1.categoriesRoutes, {
    prefix: '/api/categories',
});
exports.app.register(routes_1.refreshTokensRoutes, {
    prefix: '/api/refresh-tokens',
});
exports.app.register(routes_1.productsRoutes, {
    prefix: '/api/products',
});
exports.app.register(sales_routes_1.salesRoutes, {
    prefix: '/api/sales',
});
exports.app.setErrorHandler((error, _, reply) => {
    if (error instanceof zod_1.ZodError) {
        return reply.status(400).send({ error: error.errors[0].message });
    }
    if (env_1.env.NODE_ENV !== 'production') {
        console.error(error);
    }
    reply.status(500).send({ error: 'Internal server error' });
});
