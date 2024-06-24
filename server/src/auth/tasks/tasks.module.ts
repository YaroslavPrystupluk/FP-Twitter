import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TasksService],
})
export class TasksModule {}
