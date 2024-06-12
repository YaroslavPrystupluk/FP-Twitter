import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/posts/posts.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async subscribe(
    followerId: string,
    followingId: string,
  ): Promise<Subscription> {
    const follower = await this.userService.findOne(followerId);
    const following = await this.userService.findOne(followingId);

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    if (followerId === followingId) {
      throw new BadRequestException('User cannot subscribe to themselves');
    }
    const subscription = this.subscriptionRepository.create({
      follower,
      following,
    });
    return this.subscriptionRepository.save(subscription);
  }

  async unsubscribe(followerId: string, followingId: string): Promise<string> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        following: {
          id: followingId,
        },
        follower: {
          id: followerId,
        },
      },
      relations: {
        following: true,
        follower: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    await this.subscriptionRepository.delete(subscription.id);

    return subscription.id;
  }

  async findAllWhithPagination(id: string, page: number, limit: number) {
    const followings = await this.subscriptionRepository.find({
      where: {
        following: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        follower: true,
        following: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!followings) throw new NotFoundException('Followers not found');
    return followings;
  }
  // async findOne(followingId: string) {
  //   return await this.subscriptionRepository.findOne({
  //     where: { following: { id: followingId } },
  //     relations: { following: true, follower: true },
  //   });
  // }

  async findAll(id: string) {
    const subscribe = await this.subscriptionRepository.find({
      where: {
        following: {
          id,
        },
      },
      relations: {
        follower: true,
        following: true,
      },
    });
    return subscribe;
  }

  async getFollowingPosts(followerId: string) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { follower: { id: followerId } },
      relations: ['following'],
    });
    console.log('subscriptions', subscriptions);

    const allPosts = [];

    for (const subscription of subscriptions) {
      const posts = await this.postService.getPostsFromFollowing(
        subscription.following.id,
      );
      console.log('postsFollowing', posts);

      allPosts.push(...posts);
    }

    return allPosts;
  }
}
