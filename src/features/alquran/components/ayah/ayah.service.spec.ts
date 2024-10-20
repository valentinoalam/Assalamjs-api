import { Test, TestingModule } from '@nestjs/testing';
import { AyahService } from './ayah.service';

describe('AyahService', () => {
  let service: AyahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AyahService],
    }).compile();

    service = module.get<AyahService>(AyahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
