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
exports.deleteSalesController = deleteSalesController;
const errors_1 = require("../../../errors");
const sales_schemas_1 = require("../../../libs/zod-schemas/sales-schemas");
const make_delete_sales_use_case_1 = require("../../../use-cases/_factories/sales/make-delete-sales-use-case");
function deleteSalesController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { saleId } = request.params;
            yield sales_schemas_1.deleteSalesSchema.parseAsync({ saleId });
            const deleteSalesUseCase = (0, make_delete_sales_use_case_1.makeDeleteSalesUseCase)();
            yield deleteSalesUseCase.execute(saleId);
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            throw error;
        }
    });
}
