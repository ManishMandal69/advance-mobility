import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTransferController } from './vehicle-transfer.controller';

describe('VehicleTransferController', () => {
  let controller: VehicleTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleTransferController],
    }).compile();

    controller = module.get<VehicleTransferController>(VehicleTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
