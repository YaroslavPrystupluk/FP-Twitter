import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn({ name: 'subscription_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.subscribers)
  subscribedTo: User;

  @ManyToOne(() => User, (user) => user.subscriptions)
  subscriber: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
