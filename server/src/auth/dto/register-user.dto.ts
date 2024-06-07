import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordMatchConstraint } from 'src/decorators/isPasswordMatch.decorator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(IsPasswordMatchConstraint, {
    message: 'Passwords do not match',
  })
  confirmPassword: string;

  @IsString()
  @MinLength(3, { message: 'Display name must be at least 3 characters long' })
  @MaxLength(20, { message: 'Display name must be at most 20 characters long' })
  displayname: string;

  @IsString()
  avatar?: string = 'avatar.png';

  @IsString()
  banner?: string = 'banner.png';
}
