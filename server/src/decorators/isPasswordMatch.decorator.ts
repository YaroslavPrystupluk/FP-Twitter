import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordMatch', async: true })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const obj = args.object as CreateUserDto;

    return obj.password === confirmPassword;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(ValidationArguments: ValidationArguments): string {
    return 'Passwords do not match';
  }
}
