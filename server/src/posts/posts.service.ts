import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postsRepository.save(createPostDto);
  }

  findAll() {
    const posts = this.postsRepository.find();
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }

  findOne(text: string) {
    const post = this.postsRepository.findOne({
      where: {
        text,
      },
    });

    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const post = this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException('Post not found');
    const updatedPost = this.postsRepository.update(id, updatePostDto);
    return updatedPost;
  }

  remove(id: string) {
    const post = this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    this.postsRepository.delete(id);
    return id;
  }
}
