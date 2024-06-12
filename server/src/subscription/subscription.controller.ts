import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':followingId')
  @UsePipes(new ValidationPipe())
  async subscribe(@Param('followingId') followingId: string, @Req() req) {
    const followerId = String(req.user.id);

    return this.subscriptionService.subscribe(followerId, followingId);
  }

  @Get('pagination')
  @UsePipes(new ValidationPipe())
  async findAll(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.subscriptionService.findAllWhithPagination(
      req.user.id,
      +page,
      +limit,
    );
  }

  // @Get(':followingId')
  // @UsePipes(new ValidationPipe())
  // async findOne(@Param('followingId') followingId: string) {
  //   return await this.subscriptionService.findOne(followingId);
  // }

  @Delete(':followingId')
  @UsePipes(new ValidationPipe())
  async unsubscribe(@Param('followingId') followingId: string, @Req() req) {
    const followerId = req.user.id;
    return this.subscriptionService.unsubscribe(followerId, followingId);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async findAllFavorite(@Req() req) {
    return await this.subscriptionService.findAll(req.user.id);
  }

  @Get('following-posts')
  async getFololowingPosts(@Req() req) {
    return await this.subscriptionService.getFollowingPosts(req.user.id);
  }
}
