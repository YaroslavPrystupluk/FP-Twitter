import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Content can not empty' })
  @IsString()
  @MaxLength(280, {
    message: 'Content is too long maximal length is 280 symbols',
  })
  text: string;

  @IsOptional()
  @IsArray()
  image: string[];

  user: User;
}
