"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongPasswordLengthError = void 0;
class WrongPasswordLengthError extends Error {
    constructor(message = 'Password must be at least 6 characters long') {
        super(message);
        this.name = 'WrongPasswordLengthError';
    }
}
exports.WrongPasswordLengthError = WrongPasswordLengthError;
