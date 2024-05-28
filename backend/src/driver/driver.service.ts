import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/entities/driver.entities';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  findOne(id: number): Promise<Driver> {
    return this.driverRepository.findOneBy({ id });
  }

  create(driver: Driver): Promise<Driver> {
    return this.driverRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    await this.driverRepository.delete(id);
  }
}
