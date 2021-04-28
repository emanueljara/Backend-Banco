import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientosController } from './agendamientos.controller';

describe('AgendamientosController', () => {
  let controller: AgendamientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamientosController],
    }).compile();

    controller = module.get<AgendamientosController>(AgendamientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
