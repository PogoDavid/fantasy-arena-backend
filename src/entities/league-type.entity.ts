import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { League } from './league.entity';

@Entity('league_types')
export class LeagueType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => League, (league) => league.type)
  leagues: League[];
}
