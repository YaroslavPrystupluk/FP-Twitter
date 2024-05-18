import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { Post } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
