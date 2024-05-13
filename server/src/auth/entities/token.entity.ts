import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn({ name: 'token_id' })
  id: string;

  @Column()
  refreshToken: string;

  @Column()
  exp: Date;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
