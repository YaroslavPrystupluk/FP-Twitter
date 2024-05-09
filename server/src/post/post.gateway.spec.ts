import { Test, TestingModule } from '@nestjs/testing';
import { PostGateway } from './post.gateway';
import { PostService } from './post.service';

describe('PostGateway', () => {
  let gateway: PostGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostGateway, PostService],
    }).compile();

    gateway = module.get<PostGateway>(PostGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
