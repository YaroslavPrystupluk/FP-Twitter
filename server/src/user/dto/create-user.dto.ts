import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordMatchConstraint } from 'src/decorators/isPasswordMatch.decorator';
import { Provider } from 'src/enum/provider.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(IsPasswordMatchConstraint, {
    message: 'Passwords do not match',
  })
  confirmPassword?: string;

  @IsString()
  displayname?: string;

  @IsString()
  provider?: Provider;

  @IsBoolean()
  isActivated?: boolean;

  @IsBoolean()
  isRememberMe?: boolean;

  @IsString()
  avatar?: string;

  @IsString()
  scrinshots?: string;
}
