import { IsString } from 'class-validator';

export class DeleteSubscriptionDto {
  @IsString()
  subscriptionId: string;
}
