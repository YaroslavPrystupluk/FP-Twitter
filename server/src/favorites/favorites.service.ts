import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/posts/posts.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  async addFavorite(userId: string, postId: string): Promise<Favorite> {
    const user = await this.userService.findOne(userId);
    const post = await this.postService.findOne(postId);

    if (!user || !post) throw new NotFoundException('User or Post not found');

    if (post.user.id === userId) {
      throw new BadRequestException(
        'You cannot add your own post to favorites',
      );
    }

    const favorite = this.favoriteRepository.create({ user, post });
    return this.favoriteRepository.save(favorite);
  }

  async findAllWhithPaginationFavorite(
    id: string,
    page: number,
    limit: number,
  ) {
    const posts = await this.favoriteRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        post: true,
        user: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }

  async findAllFavorite(id: string) {
    const posts = await this.favoriteRepository.find({
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
        post: true,
      },
    });
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }

  async removeFavorite(userId: string, postId: string): Promise<string> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
      relations: {
        user: true,
        post: true,
      },
    });

    if (!favorite) throw new NotFoundException('Favorite not found');
    await this.favoriteRepository.delete(favorite.id);
    return favorite.id;
  }
}
