import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':id/subscribe')
  async subscribe(
    @Param('id') subscriberId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    // return await this.subscriptionService.subscribe(
    //   subscriberId,
    //   createSubscriptionDto.subscribedToId,
    // );
  }

  @Get()
  async findAll() {
    return await this.subscriptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subscriptionService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subscriptionService.remove(+id);
  }
}
