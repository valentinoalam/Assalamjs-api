import { Test, TestingModule } from '@nestjs/testing';
import { StoreDataService } from './store-data.service';

describe('StoreDataService', () => {
  let service: StoreDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreDataService],
    }).compile();

    service = module.get<StoreDataService>(StoreDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
