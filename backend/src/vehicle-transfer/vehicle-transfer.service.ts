import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleDriverMapping } from 'src/entities/vehicle_driver_mapping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTransferService {
  constructor(
    @InjectRepository(VehicleDriverMapping)
    private vehicleTransferRepository: Repository<VehicleDriverMapping>,
  ) {}

  findAll(): Promise<VehicleDriverMapping[]> {
    return this.vehicleTransferRepository
      .createQueryBuilder('vehicle_driver_mapping')
      .innerJoinAndSelect('vehicle_driver_mapping.vehicle', 'vehicle')
      .innerJoinAndSelect('vehicle_driver_mapping.driver', 'driver')
      .getMany();
  }

  findAllByVehicleId(vehicleId: number): Promise<VehicleDriverMapping[]> {
    return this.vehicleTransferRepository
      .createQueryBuilder('vehicle_driver_mapping')
      .innerJoinAndSelect('vehicle_driver_mapping.vehicle', 'vehicle')
      .innerJoinAndSelect('vehicle_driver_mapping.driver', 'driver')
      .where('vehicle_driver_mapping.vehicleId = :vehicleId', { vehicleId })
      .orderBy('vehicle_driver_mapping.createdAt', 'DESC')
      .getMany();
  }

  create(vehicleTransfer: VehicleDriverMapping): Promise<VehicleDriverMapping> {
    return this.vehicleTransferRepository.save(vehicleTransfer);
  }
}
