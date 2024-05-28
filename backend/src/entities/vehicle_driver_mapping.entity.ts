import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from './driver.entities';
import { Vehicle } from './vehicle.entity';

@Entity()
export class VehicleDriverMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: number;

  @Column({ nullable: true }) // Making driverId optional
  driverId: number | null; 

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Set default value to current timestamp
  createdAt: Date;

  @BeforeInsert()
  updateTimestamps() {
    if (!this.createdAt) {
      this.createdAt = new Date(); // Set createdAt to current timestamp only if it's not already set
    }
  }

  @ManyToOne(() => Driver, { nullable: true }) // Define ManyToOne relationship with Driver entity
  @JoinColumn({ name: 'driverId' }) // Define the foreign key column name
  driver: Driver | null; // Define a property to hold the related driver

  @ManyToOne(() => Vehicle) // Define ManyToOne relationship with Driver entity
  @JoinColumn({ name: 'vehicleId' }) // Define the foreign key column name
  vehicle: Vehicle; // Define a property to hold the related driver
}
