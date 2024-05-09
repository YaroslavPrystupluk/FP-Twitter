import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostGateway } from './post.gateway';

@Module({
  providers: [PostGateway, PostService],
})
export class PostModule {}
