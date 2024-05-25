import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverService } from './driver/driver.service';
import { DriverController } from './driver/driver.controller';
import { Driver } from './entities/driver.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'sqlite', etc.
      host: 'localhost',
      port: 5432, // or the appropriate port for your database
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      entities: [Driver],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([Driver])
  ],
  controllers: [AppController, DriverController],
  providers: [AppService, DriverService],
})
export class AppModule {}
