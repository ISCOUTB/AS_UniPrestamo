import { Injectable } from '@nestjs/common';
import { ResourcesRepository } from './resources.repository';

@Injectable()
export class ResourcesService {
  getById(resourceId: any) {
    throw new Error('Method not implemented.');
  }
  updateStatus(resourceId: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private repo: ResourcesRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  create(data: any) {
    return this.repo.create(data);
  }
}
