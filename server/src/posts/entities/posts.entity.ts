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
  id: string;

  @Column()
  text: string;

  @Column('text', { array: true, default: [] })
  image: string[];

  @Column({ default: false })
  isFavirite: boolean;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
