import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('league_types')
export class LeagueType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  typeName: string;
}
