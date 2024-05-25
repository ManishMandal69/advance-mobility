import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from 'src/entities/driver.entities';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Driver> {
    return this.driverService.findOne(+id);
  }

  @Post()
  create(@Body() driver: Driver): Promise<Driver> {
    return this.driverService.create(driver);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.driverService.remove(+id);
  }
}
