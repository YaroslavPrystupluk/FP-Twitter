import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async subscribe(
    subscriberId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    // const subscriber = this.subscriptionRepository.findOne({
    //   where: { subscriberId },
    // });

    // const subscribedTo = this.subscriptionRepository.findOne({
    //   where: { subscribedToId: createSubscriptionDto.subscribedToId },
    // });
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
