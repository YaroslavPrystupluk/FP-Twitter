import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  isActivated: boolean;
}
