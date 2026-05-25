import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';

import { ResourcesModule } from '../resources/resources.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ResourcesModule, UsersModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
