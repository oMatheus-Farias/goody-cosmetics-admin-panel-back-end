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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsUseCase = void 0;
const sharp_1 = __importDefault(require("sharp"));
const stream_1 = require("stream");
const server_1 = require("uploadthing/server");
const errors_1 = require("../../errors");
class CreateProductsUseCase {
    constructor(productsRepo, categoriesRepo) {
        this.productsRepo = productsRepo;
        this.categoriesRepo = categoriesRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const product = yield this.productsRepo.findByName(data.name);
            if (product) {
                throw new errors_1.AlreadyExistsError('Product already exists');
            }
            const category = yield this.categoriesRepo.findById(data.categoryId);
            if (!category) {
                throw new errors_1.NotFoundError('Category not found');
            }
            const createdProductData = {
                name: data.name,
                description: data.description,
                categories: {
                    connect: {
                        id: data.categoryId,
                    },
                },
                oldPrice: data.oldPrice,
                currentPrice: data.currentPrice,
                stockQuantity: data.stockQuantity,
            };
            const utapi = new server_1.UTApi();
            const compressedFiles = yield Promise.all(data.imageFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
                const stream = file.stream();
                const buffer = yield this.streamToBuffer(stream);
                const compressedBuffer = yield (0, sharp_1.default)(buffer)
                    .resize(1024)
                    .jpeg({ quality: 80 })
                    .toBuffer();
                return Object.assign(Object.assign({}, file), { buffer: compressedBuffer, stream: stream_1.Readable.from(compressedBuffer) });
            })));
            const uploads = yield Promise.all(compressedFiles.map((file) => {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().replace(/[:.]/g, '-');
                const fileName = `uploaded-file-${formattedDate}.jpg`;
                const fileEsque = new File([file.buffer], fileName, {
                    type: file.type,
                    lastModified: file.lastModified,
                });
                return utapi.uploadFiles(fileEsque);
            }));
            const imageUrls = [];
            for (let i = 0; i < uploads.length; i++) {
                imageUrls.push((_a = uploads[i].data) === null || _a === void 0 ? void 0 : _a.ufsUrl);
            }
            yield this.productsRepo
                .create(createdProductData)
                .then((product) => __awaiter(this, void 0, void 0, function* () {
                yield this.productsRepo.createImages(product.id, { imageUrls });
            }))
                .catch(() => {
                throw new errors_1.ConflictError('Error creating product');
            });
        });
    }
    streamToBuffer(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, stream_2, stream_2_1;
            var _b, e_1, _c, _d;
            if (!stream || typeof stream[Symbol.asyncIterator] !== 'function') {
                console.error('Invalid stream provided:', stream);
                throw new TypeError('The provided stream is not a valid Readable stream.');
            }
            const chunks = [];
            try {
                for (_a = true, stream_2 = __asyncValues(stream); stream_2_1 = yield stream_2.next(), _b = stream_2_1.done, !_b; _a = true) {
                    _d = stream_2_1.value;
                    _a = false;
                    const chunk = _d;
                    chunks.push(Buffer.from(chunk));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = stream_2.return)) yield _c.call(stream_2);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return Buffer.concat(chunks);
        });
    }
}
exports.CreateProductsUseCase = CreateProductsUseCase;
