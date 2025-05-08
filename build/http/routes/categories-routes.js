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
exports.categoriesRoutes = categoriesRoutes;
const categories_1 = require("../controllers/categories");
const verify_jwt_1 = require("../middlewares/verify-jwt");
function categoriesRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/', categories_1.findAllCategoriesController);
        app.get('/params', { onRequest: [verify_jwt_1.verifyJwt] }, categories_1.findAllCategoriesWithParamsController);
        app.post('/', { onRequest: [verify_jwt_1.verifyJwt] }, categories_1.createCategoriesController);
        app.put('/:categoryId', { onRequest: [verify_jwt_1.verifyJwt] }, categories_1.updateCategoriesController);
        app.delete('/:categoryId', { onRequest: [verify_jwt_1.verifyJwt] }, categories_1.deleteCategoriesController);
    });
}
