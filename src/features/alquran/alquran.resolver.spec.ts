import { Test, TestingModule } from '@nestjs/testing';
import { AlquranResolver } from './alquran.resolver';
import { AlquranService } from './alquran.service';

describe('AlquranResolver', () => {
  let resolver: AlquranResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlquranResolver, AlquranService],
    }).compile();

    resolver = module.get<AlquranResolver>(AlquranResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
