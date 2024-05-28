import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VehicleDriverMapping} from 'src/entities/vehicle_driver_mapping.entity';
import { VehicleTransferService } from './vehicle-transfer.service';

@Controller('vehicle-transfer')
export class VehicleTransferController {
  constructor(private readonly vehicleTransferService: VehicleTransferService) {}

  @Get()
  findAll(): Promise<VehicleDriverMapping[]> {
    return this.vehicleTransferService.findAll();
  }

  @Get(':id')
  findAllVehicleId(@Param('id') id: number): Promise<VehicleDriverMapping[]> {
    return this.vehicleTransferService.findAllByVehicleId(id);
  }

  @Post()
  create(@Body() vehicleTransfer: VehicleDriverMapping): Promise<VehicleDriverMapping> {
    console.log(vehicleTransfer)
    return this.vehicleTransferService.create(vehicleTransfer);
  }
}
