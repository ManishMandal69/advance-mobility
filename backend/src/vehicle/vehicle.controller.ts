import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/entities/vehicle.entity';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.findOne(+id);
  }

  @Post()
  create(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleService.create(vehicle);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.vehicleService.remove(+id);
  }
}
