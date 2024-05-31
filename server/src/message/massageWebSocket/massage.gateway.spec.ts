import { Test, TestingModule } from '@nestjs/testing';
import { MassageGateway } from './massage.gateway';

describe('MassageGateway', () => {
  let gateway: MassageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MassageGateway],
    }).compile();

    gateway = module.get<MassageGateway>(MassageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
