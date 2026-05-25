export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class Reservation {
  id: number;
  userId: number;
  resourceId: number;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
}
