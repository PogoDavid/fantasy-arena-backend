import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { LeagueType } from './league-type.entity';
import { User } from './user.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ManyToOne(() => LeagueType)
  type: LeagueType;

  @ManyToOne(() => User, (user) => user.leagues, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'archived_at' })
  archivedAt: Date;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'float', nullable: true })
  budget: number;
}
