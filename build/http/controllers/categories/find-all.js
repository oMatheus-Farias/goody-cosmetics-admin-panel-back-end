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
exports.findAllCategoriesController = findAllCategoriesController;
const env_1 = require("../../../configs/env");
const make_find_all_categories_use_case_1 = require("../../../use-cases/_factories/categories/make-find-all-categories-use-case");
function findAllCategoriesController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const findAllCategoriesUseCase = (0, make_find_all_categories_use_case_1.makeFindAllCategoriesUseCase)();
            const categories = yield findAllCategoriesUseCase.execute();
            return reply.status(200).send(categories);
        }
        catch (error) {
            if (env_1.env.NODE_ENV === 'development') {
                console.error(error);
            }
            throw error;
        }
    });
}
