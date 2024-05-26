import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-posts.dto';
import { UpdatePostDto } from './dto/update-posts.dto';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, user: User) {
    const newPost = {
      text: createPostDto.text,
      image: createPostDto.image,
      user,
    };

    return await this.postsRepository.save(newPost);
  }

  async findAll(id: string) {
    const posts = await this.postsRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }

  async findOne(textOrId: string) {
    let post: Post | undefined;
    if (!isNaN(Number(textOrId))) {
      post = await this.postsRepository.findOne({
        where: {
          id: textOrId,
        },

        relations: {
          user: true,
        },
      });
    } else {
      post = await this.postsRepository.findOne({
        where: {
          text: Like(`%${textOrId}%`),
        },
        relations: {
          user: true,
        },
      });
    }

    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException('Post not found');

    const updatedPost = this.postsRepository.update(id, updatePostDto);
    return updatedPost;
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException('Post not found');
    this.postsRepository.delete(id);

    return id;
  }

  // async toggleFavorite(id: string, user: User) {
  //   const post = await this.postsRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!post) throw new NotFoundException('Post not found');
  //   post.isFavirite = !post.isFavirite;
  //   return await this.postsRepository.save(post);
  // }

  async findAllWhithPagination(id: string, page: number, limit: number) {
    const posts = await this.postsRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }
}
