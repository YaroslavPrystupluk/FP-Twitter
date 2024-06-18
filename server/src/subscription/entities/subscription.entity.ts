import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryColumn()
  followerId: string;

  @PrimaryColumn()
  followingId: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  following: User;
}
