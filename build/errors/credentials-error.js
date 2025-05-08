"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsError = void 0;
class CredentialsError extends Error {
    constructor(message = 'Invalid credentials') {
        super(message);
        this.name = 'CredentialsError';
    }
}
exports.CredentialsError = CredentialsError;
