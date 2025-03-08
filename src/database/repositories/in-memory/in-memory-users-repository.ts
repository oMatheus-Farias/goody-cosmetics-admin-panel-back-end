import type { $Enums, Prisma, User } from '@prisma/client';

import { UsersRepository } from '../interfaces';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(
    userId: string,
  ): Promise<Pick<User, 'id' | 'firstName' | 'lastName'> | null> {
    const user = this.items.find((user) => user.id === userId);
    return user || null;
  }
  async findByNames(
    firstName: string,
    lastName: string,
  ): Promise<Pick<User, 'id' | 'email'> | null> {
    const user = this.items.find(
      (user) => user.firstName === firstName && user.lastName === lastName,
    );
    return user ? { id: user.id, email: user.email } : null;
  }
  async findByEmail(email: string): Promise<Pick<User, 'id' | 'email'> | null> {
    const user = this.items.find((user) => user.email === email);
    return user || null;
  }
  async findAllWithParams(
    page: number,
    searchTerm?: string,
  ): Promise<{
    users: User[] | null;
    meta: {
      pageIndex: number;
      limit: number;
      countPerPage: number;
      totalCount: number;
    };
  }> {
    const users = searchTerm
      ? this.items.filter(
          (category) =>
            category.firstName.includes(searchTerm) ||
            category.lastName.includes(searchTerm),
        )
      : this.items;
    const count = users.length;
    const totalCount = this.items.length;
    return {
      users,
      meta: {
        pageIndex: page,
        limit: 10,
        countPerPage: count,
        totalCount: totalCount,
      },
    };
  }
  async create(data: Prisma.UserCreateInput): Promise<void> {
    this.items.push(data as User);
  }
  async update(userId: string, data: Prisma.UserUpdateInput): Promise<void> {
    const user = this.items.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.firstName) {
      user.firstName = data.firstName as string;
    }
    if (data.lastName) {
      user.lastName = data.lastName as string;
    }
    if (data.role) {
      user.role = data.role as $Enums.UserRole;
    }
  }
  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = this.items.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.passwordHash !== oldPassword) {
      throw new Error('Old password is incorrect');
    }
    user.passwordHash = newPassword;
  }
  async forgotPassword(
    userId: string,
    resetToken: string,
    resetTokenExpiresAt: Date,
  ): Promise<void> {
    const user = this.items.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.resetToken = resetToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;
  }
  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = this.items.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.passwordHash = newPassword;
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
  }
  async setNullResetToken(userId: string): Promise<void> {
    const user = this.items.find((user) => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
  }
  async delete(userId: string): Promise<void> {
    const userIndex = this.items.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    this.items.splice(userIndex, 1);
  }
}
