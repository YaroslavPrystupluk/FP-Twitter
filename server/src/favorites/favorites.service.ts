import { Injectable, NotFoundException } from '@nestjs/common';
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
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!posts) throw new NotFoundException('Posts not found');
    return posts;
  }

  async removeFavorite(userId: string, postId: string): Promise<string> {
    await this.favoriteRepository.delete({
      user: { id: userId },
      post: { id: postId },
    });

    return 'ok';
  }
}
