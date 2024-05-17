import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-posts.dto';
import { IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  id: string;
}
