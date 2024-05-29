import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
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

  async create(
    createPostDto: CreatePostDto,
    user: User,
    files: { image?: Express.Multer.File[] },
  ) {
    const images = files?.image?.map((file) => file.path) || [];

    const newPost = {
      text: createPostDto.text,
      image: images,
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

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    files: { image?: Express.Multer.File[] },
  ) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) throw new NotFoundException('Post not found');

    if (files?.image && files.image.length > 0) {
      const images = files.image.map((file) => file.path);
      updatePostDto.image = images;
    }
    const deletedImages = post.image.filter((image) => {
      if (updatePostDto.image) return !updatePostDto.image.includes(image);

      return (updatePostDto.image = []);
    });

    deletedImages.forEach((image) => {
      const imagePath = `${image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`Image not found: ${imagePath}`);
      }
    });

    const updatedPost = await this.postsRepository.save({
      ...post,
      ...updatePostDto,
    });

    return updatedPost;
  }

  async remove(id: string) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    post.image.forEach((image) => {
      if (fs.existsSync(`${image}`)) {
        fs.unlinkSync(`${image}`);
      } else {
        throw new NotFoundException('Image not found');
      }
    });

    if (!post) throw new NotFoundException('Post not found');
    this.postsRepository.delete(id);

    return id;
  }
}
