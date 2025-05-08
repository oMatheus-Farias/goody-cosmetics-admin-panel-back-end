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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFile = processFile;
const node_crypto_1 = require("node:crypto");
const node_path_1 = __importDefault(require("node:path"));
function processFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const ext = node_path_1.default.extname(file.name);
        const fileName = file.name.replace(ext, '');
        const newFileName = `${fileName}-${(0, node_crypto_1.randomUUID)()}${ext}`;
        return new File([file], newFileName, { type: file.type });
    });
}
