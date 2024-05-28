import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Driver } from './driver.entities';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleNumber: string;

  @Column()
  vehicleType: string;

  @Column()
  pucCertificate: string;

  @Column()
  insuranceCertificate: string;

}
