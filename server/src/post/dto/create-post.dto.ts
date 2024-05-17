import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(280, {
    message: 'Content is too long maximal length is 280 symbols',
  })
  text: string;

  @IsString()
  image: string;

  @IsDateString()
  createdAt: Date;
}
