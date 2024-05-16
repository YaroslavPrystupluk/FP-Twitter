import { Controller } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}
}
