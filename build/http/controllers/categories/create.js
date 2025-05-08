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
exports.createCategoriesController = createCategoriesController;
const errors_1 = require("../../../errors");
const categories_schemas_1 = require("../../../libs/zod-schemas/categories-schemas");
const make_create_categories_use_case_1 = require("../../../use-cases/_factories/categories/make-create-categories-use-case");
function createCategoriesController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = request.body;
            yield categories_schemas_1.categoriesSchema.parseAsync({ name });
            const createCategoriesUseCase = (0, make_create_categories_use_case_1.makeCreateCategoriesUseCase)();
            yield createCategoriesUseCase.execute({ name });
            return reply.status(201).send({ message: 'Category created' });
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyExistsError) {
                return reply.status(409).send({ error: error.message });
            }
            throw error;
        }
    });
}
