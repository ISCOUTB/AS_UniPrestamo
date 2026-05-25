import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
