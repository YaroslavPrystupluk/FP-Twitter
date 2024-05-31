import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;

  senderId: string;

  receiverId: string;
}
