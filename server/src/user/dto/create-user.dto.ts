import {
  IsAlphanumeric,
  IsEmail,
  IsUppercase,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
