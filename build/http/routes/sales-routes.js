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
exports.salesRoutes = salesRoutes;
const sales_1 = require("../controllers/sales");
const middlewares_1 = require("../middlewares");
function salesRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/params', { onRequest: [middlewares_1.verifyJwt] }, sales_1.findAllSalesWithParamsController);
        app.post('/', { onRequest: [middlewares_1.verifyJwt] }, sales_1.createSalesController);
        app.patch('/:saleId', { onRequest: [middlewares_1.verifyJwt] }, sales_1.updateSalesController);
        app.delete('/:saleId', { onRequest: [middlewares_1.verifyJwt] }, sales_1.deleteSalesController);
        app.delete('/items/:saleItemId', { onRequest: [middlewares_1.verifyJwt] }, sales_1.deleteSaleItemsController);
    });
}
