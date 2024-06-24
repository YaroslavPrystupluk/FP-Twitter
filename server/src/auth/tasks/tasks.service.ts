import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(private readonly usersService: UserService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async removeUnconfirmedUsers() {
    const TEN_MINUTES = 10 * 60 * 1000;
    const users = await this.usersService.findAll();

    for (const user of users) {
      if (
        !user.isActivated &&
        user.createdAt.getTime() + TEN_MINUTES < Date.now()
      ) {
        await this.usersService.remove(user.id);
      }
    }
  }
}
