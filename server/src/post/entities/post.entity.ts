import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
