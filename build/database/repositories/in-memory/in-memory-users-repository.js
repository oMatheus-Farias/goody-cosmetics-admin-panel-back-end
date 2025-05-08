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
exports.InMemoryUsersRepository = void 0;
const node_crypto_1 = require("node:crypto");
class InMemoryUsersRepository {
    constructor() {
        this.items = [];
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            return user || null;
        });
    }
    findByIdWithReturnedPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            return user ? { id: user.id, passwordHash: user.passwordHash } : null;
        });
    }
    findByNames(firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.firstName === firstName && user.lastName === lastName);
            return user ? { id: user.id, email: user.email } : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.email === email);
            return user || null;
        });
    }
    findByResetToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.resetToken === resetToken);
            return user || null;
        });
    }
    findAllWithParams(page, searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = searchTerm
                ? this.items.filter((category) => category.firstName.includes(searchTerm) ||
                    category.lastName.includes(searchTerm))
                : this.items;
            const count = users.length;
            const totalCount = this.items.length;
            const usersToReturn = users.map((user) => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                };
            });
            return {
                users: usersToReturn,
                meta: {
                    pageIndex: page,
                    limit: 10,
                    countPerPage: count,
                    totalCount: totalCount,
                },
            };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.items.push({
                id: (0, node_crypto_1.randomBytes)(16).toString('hex'),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                passwordHash: data.password,
                role: data.role,
                resetToken: null,
                resetTokenExpiresAt: null,
                createdAt: new Date(),
            });
        });
    }
    update(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (data.firstName) {
                user.firstName = data.firstName;
            }
            if (data.lastName) {
                user.lastName = data.lastName;
            }
            if (data.role) {
                user.role = data.role;
            }
        });
    }
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.passwordHash = newPassword;
        });
    }
    forgotPassword(userId, resetToken, resetTokenExpiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.resetToken = resetToken;
            user.resetTokenExpiresAt = resetTokenExpiresAt;
        });
    }
    resetPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.passwordHash = newPassword;
            user.resetToken = null;
            user.resetTokenExpiresAt = null;
        });
    }
    setNullResetToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.items.find((user) => user.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.resetToken = null;
            user.resetTokenExpiresAt = null;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIndex = this.items.findIndex((user) => user.id === userId);
            if (userIndex === -1) {
                throw new Error('User not found');
            }
            this.items.splice(userIndex, 1);
        });
    }
}
exports.InMemoryUsersRepository = InMemoryUsersRepository;
