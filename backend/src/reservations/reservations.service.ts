import { Injectable, BadRequestException } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { ResourcesService } from '../resources/resources.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    private repo: ReservationsRepository,
    private resourcesService: ResourcesService,
    private usersService: UsersService,
  ) {}

  getAll() {
    return this.repo.findAll();
  }

  create(data: any) {
    const { resourceId, userId, startDate, endDate } = data;

    // Validar usuario
    const user = this.usersService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Validar recurso
    const resource = this.resourcesService.getById(resourceId);
    if (!resource) {
      throw new BadRequestException('Resource not found');
    }

    // Validar fechas
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('Invalid date range');
    }

    // Validar conflictos
    const existingReservations = this.repo.findByResource(resourceId);

    const conflict = existingReservations.find(r => {
      return (
        new Date(startDate) < new Date(r.endDate) &&
        new Date(endDate) > new Date(r.startDate)
      );
    });

    if (conflict) {
      throw new BadRequestException('Resource already reserved in this time range');
    }

    // Crear reserva
    const newReservation = {
      ...data,
      status: 'ACTIVE',
      id: Date.now(),
    };
    this.resourcesService.updateStatus(resourceId, 'RESERVED');
    return this.repo.create(newReservation);
  }

  updateStatus(id: number, status: string) {
    const resource = this.repo.findById(id);
    if (resource) {
      resource.status = status;
    }
    return resource;
  }
}
