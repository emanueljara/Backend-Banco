import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientosService } from './agendamientos.service';

describe('AgendamientosService', () => {
  let service: AgendamientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendamientosService],
    }).compile();

    service = module.get<AgendamientosService>(AgendamientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
