import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourcesRepository {
  private resources: Resource[] = [];

  findAll() {
    return this.resources;
  }

  findById(id: number) {
    return this.resources.find(r => r.id === id);
  }

  create(resource: Resource) {
    this.resources.push(resource);
    return resource;
  }
}
