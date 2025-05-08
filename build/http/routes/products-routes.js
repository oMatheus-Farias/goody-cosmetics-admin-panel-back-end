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
exports.productsRoutes = productsRoutes;
const products_1 = require("../controllers/products");
const middlewares_1 = require("../middlewares");
function productsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/:productId', products_1.findProductsByIdController);
        app.get('/', products_1.findAllProductsController);
        app.get('/category', products_1.findAllProductsByCategoryIdController);
        app.get('/params', { onRequest: [middlewares_1.verifyJwt] }, products_1.findAllProductsWithParamsController);
        app.post('/', { onRequest: [middlewares_1.verifyJwt] }, products_1.createProductsController);
        app.put('/:productId', { onRequest: [middlewares_1.verifyJwt] }, products_1.updateProductsController);
        app.put('/images/:imageId', { onRequest: [middlewares_1.verifyJwt] }, products_1.updateProductsImagesController);
        app.delete('/:productId', { onRequest: [middlewares_1.verifyJwt] }, products_1.deleteProductsController);
    });
}
