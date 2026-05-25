import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.findAll();
  }

  getUserById(id: number) {
    return this.usersRepository.findById(id);
  }

  createUser(data: any) {
    return this.usersRepository.create(data);
  }
}
