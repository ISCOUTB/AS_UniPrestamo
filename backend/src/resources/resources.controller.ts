import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private service: ResourcesService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }
}
