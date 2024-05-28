import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver/driver.service';
import { DriverController } from './driver/driver.controller';
import { Driver } from './entities/driver.entities';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleDriverMapping } from './entities/vehicle_driver_mapping.entity';
import { VehicleTransferService } from './vehicle-transfer/vehicle-transfer.service';
import { VehicleTransferController } from './vehicle-transfer/vehicle-transfer.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'sqlite', etc.
      host: 'localhost',
      port: 5432, // or the appropriate port for your database
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      entities: [Driver,Vehicle,VehicleDriverMapping],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([Driver, Vehicle, VehicleDriverMapping])
  ],
  controllers: [AppController, DriverController, VehicleController, VehicleTransferController],
  providers: [AppService, DriverService, VehicleService, VehicleTransferService],
})
export class AppModule {}
