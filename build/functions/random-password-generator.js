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
exports.randomPasswordGenerator = randomPasswordGenerator;
const errors_1 = require("../errors");
const users_schemas_1 = require("../libs/zod-schemas/users-schemas");
function randomPasswordGenerator() {
    return __awaiter(this, arguments, void 0, function* (length = 10) {
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const specialCharacters = '!@#$%^&*()-_+=~[]{}|;:,.<>?';
        const numbers = '0123456789';
        if (length < 8) {
            throw new errors_1.WrongPasswordLengthError('Error generating password, try again.');
        }
        let password = '';
        password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
        password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        const allCharacters = uppercaseLetters + lowercaseLetters + specialCharacters + numbers;
        const remainingLength = length - password.length;
        for (let i = 0; i < remainingLength; i++) {
            password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }
        password = password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
        yield users_schemas_1.usersFirstPasswordSchema.parseAsync({ password });
        return password;
    });
}
