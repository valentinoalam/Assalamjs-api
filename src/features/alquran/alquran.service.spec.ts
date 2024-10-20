import { Test, TestingModule } from '@nestjs/testing';
import { AlquranService } from './alquran.service';

describe('AlquranService', () => {
  let service: AlquranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlquranService],
    }).compile();

    service = module.get<AlquranService>(AlquranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
