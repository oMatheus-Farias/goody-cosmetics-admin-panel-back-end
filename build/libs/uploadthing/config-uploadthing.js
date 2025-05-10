"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const fastify_1 = require("uploadthing/fastify");
const env_1 = require("../../configs/env");
const f = (0, fastify_1.createUploadthing)();
exports.uploadRouter = {
    imageUploader: f({
        image: {
            maxFileSize: '16MB',
            maxFileCount: 2,
        },
    }).onUploadComplete((data) => {
        if (env_1.env.NODE_ENV !== 'production') {
            console.log(data);
        }
    }),
};
