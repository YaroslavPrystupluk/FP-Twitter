import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;
}
