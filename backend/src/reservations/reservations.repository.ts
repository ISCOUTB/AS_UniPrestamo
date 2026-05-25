import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsRepository {
  findById(id: number) {
    throw new Error('Method not implemented.');
  }
  private reservations: Reservation[] = [];

  findAll() {
    return this.reservations;
  }

  findByResource(resourceId: number) {
    return this.reservations.filter(r => r.resourceId === resourceId);
  }

  create(reservation: Reservation) {
    this.reservations.push(reservation);
    return reservation;
  }
}
