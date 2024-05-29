import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':followingId')
  async subscribe(@Param('followingId') followingId: string, @Req() req) {
    const followerId = String(req.user.id);

    return this.subscriptionService.subscribe(followerId, followingId);
  }

  @Get('pagination')
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

  @Get(':followingId')
  async findOne(@Param('followingId') followingId: string) {
    return await this.subscriptionService.findOne(followingId);
  }

  @Delete(':followingId')
  async unsubscribe(@Param('followingId') followingId: string, @Req() req) {
    const followerId = req.user.id;
    return this.subscriptionService.unsubscribe(followerId, followingId);
  }
}
